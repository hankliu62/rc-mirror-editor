import MirrorEditor from '@hankliu/rc-mirror-editor';
import * as React from 'react';

const LanguageDemo = `/* eslint-disable no-restricted-globals */
/* eslint-disable no-case-declarations */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import defaults from "lodash/defaults";
import groupBy from "lodash/groupBy";
import MyWorker from "worker-loader!./parser.worker.ts";

import {
  ICompletionItem,
  ICursorInfo,
  ITableInfo,
  reader,
} from "../sql-parser";
import { IParseResult } from "../syntax-parser";
import { DefaultOpts, IMonacoVersion, IParserType } from "./default-opts";

const supportedMirrorEditorVersion = ["0.13.2", "0.15.6"];

export function monacoSqlAutocomplete(
  monaco: any,
  editor: any,
  opts?: Partial<DefaultOpts>
) {
  opts = defaults(opts || {}, new DefaultOpts(monaco));

  // eslint-disable-next-line unicorn/prefer-includes
  if (supportedMirrorEditorVersion.indexOf(opts.MirrorEditorVersion) === -1) {
    throw new Error(
      \`monaco-editor version \${
        opts.MirrorEditorVersion
      } is not allowed, only support \${supportedMirrorEditorVersion.join(" ")}\`
    );
  }

  // Get parser info and show error.
  let currentParserPromise: any = null;
  let editVersion = 0;

  editor.onDidChangeModelContent((event: any) => {
    editVersion++;
    const currentEditVersion = editVersion;

    currentParserPromise = new Promise((resolve) => {
      setTimeout(() => {
        const model = editor.getModel();

        // eslint-disable-next-line promise/catch-or-return
        asyncParser(
          editor.getValue(),
          model.getOffsetAt(editor.getPosition()),
          opts.parserType
        ).then((parseResult) => {
          resolve(parseResult);

          if (currentEditVersion !== editVersion) {
            return;
          }

          opts.onParse(parseResult);

          if (parseResult.error) {
            const newReason =
              parseResult.error.reason === "incomplete"
                ? \`Incomplete, expect next input: \n\${parseResult.error.suggestions
                    .map((each) => {
                      return each.value;
                    })
                    .join("\n")}\`
                : \`Wrong input, expect: \n\${parseResult.error.suggestions
                    .map((each) => {
                      return each.value;
                    })
                    .join("\n")}\`;

            const errorPosition = parseResult.error.token
              ? {
                  startLineNumber: model.getPositionAt(
                    parseResult.error.token.position[0]
                  ).lineNumber,
                  startColumn: model.getPositionAt(
                    parseResult.error.token.position[0]
                  ).column,
                  endLineNumber: model.getPositionAt(
                    parseResult.error.token.position[1]
                  ).lineNumber,
                  endColumn:
                    model.getPositionAt(parseResult.error.token.position[1])
                      .column + 1,
                }
              : {
                  startLineNumber: 0,
                  startColumn: 0,
                  endLineNumber: 0,
                  endColumn: 0,
                };

            model.getPositionAt(parseResult.error.token);

            monaco.editor.setModelMarkers(model, opts.language, [
              {
                ...errorPosition,
                message: newReason,
                severity: getSeverityByVersion(
                  monaco,
                  opts.MirrorEditorVersion
                ),
              },
            ]);
          } else {
            monaco.editor.setModelMarkers(editor.getModel(), opts.language, []);
          }
        });
      });
    });
  });

  monaco.languages.registerCompletionItemProvider(opts.language, {
    triggerCharacters:
      // eslint-disable-next-line unicorn/prefer-spread
      " $.:{}=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    provideCompletionItems: async () => {
      const currentEditVersion = editVersion;
      const parseResult: IParseResult = await currentParserPromise;

      if (currentEditVersion !== editVersion) {
        return returnCompletionItemsByVersion([], opts.MirrorEditorVersion);
      }

      const cursorInfo = await reader.getCursorInfo(
        parseResult.ast,
        parseResult.cursorKeyPath
      );

      const parserSuggestion = opts.pipeKeywords(parseResult.nextMatchings);

      if (!cursorInfo) {
        return returnCompletionItemsByVersion(
          parserSuggestion,
          opts.MirrorEditorVersion
        );
      }

      switch (cursorInfo.type) {
        case "tableField": {
          const cursorRootStatementFields = await reader.getFieldsFromStatement(
            parseResult.ast,
            parseResult.cursorKeyPath,
            opts.onSuggestTableFields
          );

          // group.fieldName
          const groups = groupBy(
            cursorRootStatementFields.filter((cursorRootStatementField) => {
              return cursorRootStatementField.groupPickerName !== null;
            }),
            "groupPickerName"
          );

          const functionNames = await opts.onSuggestFunctionName(
            cursorInfo.token.value
          );

          return returnCompletionItemsByVersion(
            [
              ...cursorRootStatementFields,
              ...parserSuggestion,
              ...functionNames,
              ...(groups
                ? Object.keys(groups).map((groupName) => {
                    return opts.onSuggestFieldGroup(groupName);
                  })
                : []),
            ],
            opts.MirrorEditorVersion
          );
        }
        case "tableFieldAfterGroup": {
          // 字段 . 后面的部分
          const cursorRootStatementFieldsAfter =
            await reader.getFieldsFromStatement(
              parseResult.ast,
              parseResult.cursorKeyPath as any,
              opts.onSuggestTableFields
            );

          return returnCompletionItemsByVersion(
            [
              ...cursorRootStatementFieldsAfter.filter(
                (cursorRootStatementField: any) => {
                  return (
                    cursorRootStatementField.groupPickerName ===
                    (cursorInfo as ICursorInfo<{ groupName: string }>).groupName
                  );
                }
              ),
              ...parserSuggestion,
            ],
            opts.MirrorEditorVersion
          );
        }
        case "tableName": {
          const tableNames = await opts.onSuggestTableNames(
            cursorInfo as ICursorInfo<ITableInfo>
          );

          return returnCompletionItemsByVersion(
            [...tableNames, ...parserSuggestion],
            opts.MirrorEditorVersion
          );
        }
        case "functionName": {
          return opts.onSuggestFunctionName(cursorInfo.token.value);
        }
        default: {
          return returnCompletionItemsByVersion(
            parserSuggestion,
            opts.MirrorEditorVersion
          );
        }
      }
    },
  });

  monaco.languages.registerHoverProvider(opts.language, {
    provideHover: async (model: any, position: any) => {
      const parseResult: IParseResult = await asyncParser(
        editor.getValue(),
        model.getOffsetAt(position),
        opts.parserType
      );

      const cursorInfo = await reader.getCursorInfo(
        parseResult.ast,
        parseResult.cursorKeyPath
      );

      if (!cursorInfo) {
        return null as any;
      }

      let contents: any = [];

      switch (cursorInfo.type) {
        case "tableField": {
          const extra = await reader.findFieldExtraInfo(
            parseResult.ast,
            cursorInfo,
            opts.onSuggestTableFields,
            parseResult.cursorKeyPath
          );
          contents = await opts.onHoverTableField(
            cursorInfo.token.value,
            extra
          );
          break;
        }
        case "tableFieldAfterGroup": {
          const extraAfter = await reader.findFieldExtraInfo(
            parseResult.ast,
            cursorInfo,
            opts.onSuggestTableFields,
            parseResult.cursorKeyPath
          );
          contents = await opts.onHoverTableField(
            cursorInfo.token.value,
            extraAfter
          );
          break;
        }
        case "tableName": {
          contents = await opts.onHoverTableName(cursorInfo as ICursorInfo);
          break;
        }
        case "functionName": {
          contents = await opts.onHoverFunctionName(cursorInfo.token.value);
          break;
        }
        default:
      }

      return {
        range: monaco.Range.fromPositions(
          model.getPositionAt(cursorInfo.token.position[0]),
          model.getPositionAt(cursorInfo.token.position[1] + 1)
        ),
        contents,
      };
    },
  });
}

// 实例化一个 worker
const worker: Worker = new (MyWorker as any)();

let parserIndex = 0;

const asyncParser = async (
  text: string,
  index: number,
  parserType: IParserType
) => {
  parserIndex++;
  const currentParserIndex = parserIndex;

  let resolve: any = null;
  let reject: any = null;

  // eslint-disable-next-line promise/param-names
  const promise = new Promise((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  worker.postMessage({ text, index, parserType });

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  worker.onmessage = (event) => {
    if (currentParserIndex === parserIndex) {
      resolve(event.data);
    } else {
      reject();
    }
  };

  return promise as Promise<IParseResult>;
};

function returnCompletionItemsByVersion(
  value: ICompletionItem[],
  monacoVersion: IMonacoVersion
) {
  switch (monacoVersion) {
    case "0.13.2": {
      return value;
    }
    case "0.15.6": {
      return {
        suggestions: value,
      };
    }
    default: {
      throw new Error("Not supported version");
    }
  }
}

function getSeverityByVersion(monaco: any, monacoVersion: IMonacoVersion) {
  switch (monacoVersion) {
    case "0.13.2": {
      return monaco.Severity.Error;
    }
    case "0.15.6": {
      return monaco.MarkerSeverity.Error;
    }
    default: {
      throw new Error("Not supported version");
    }
  }
}
`;

export default function Base() {
  const [content, setContent] = React.useState<string>(LanguageDemo);

  return (
    <div>
      <MirrorEditor
        height={400}
        value={content}
        language="typescript"
        onChange={val => {
          setContent(val);
        }}
        theme="eclipse"
      />
    </div>
  );
}