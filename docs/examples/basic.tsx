import {
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Divider,
  Input,
  Row,
  Select,
} from '@hankliu/hankliu-ui';
import zhCN from '@hankliu/hankliu-ui/lib/locale/zh_CN';
import type { LanguageName, TMirrorEditorTheme } from '@hankliu/rc-mirror-editor';
import MirrorEditor, { alls, langs } from '@hankliu/rc-mirror-editor';
import * as React from 'react';

const LanguageDemo = {
  html: `<h1>Turndown Demo</h1>

  <p>This demonstrates <a href="https://github.com/mixmark-io/turndown">turndown</a> – an HTML to Markdown converter in JavaScript.</p>

  <h2>Usage</h2>

  <pre><code class="language-js">var turndownService = new TurndownService()
  console.log(
    turndownService.turndown('&lt;h1&gt;Hello world&lt;/h1&gt;')
  )</code></pre>

  <hr />

  <p>It aims to be <a href="http://commonmark.org/">CommonMark</a>
   compliant, and includes options to style the output. These options include:</p>

  <ul>
    <li>headingStyle (setext or atx)</li>
    <li>horizontalRule (*, -, or _)</li>
    <li>bullet (*, -, or +)</li>
    <li>codeBlockStyle (indented or fenced)</li>
    <li>fence (~ or ~)</li>
    <li>emDelimiter (_ or *)</li>
    <li>strongDelimiter (** or __)</li>
    <li>linkStyle (inlined or referenced)</li>
    <li>linkReferenceStyle (full, collapsed, or shortcut)</li>
  </ul>
  `,
  javascript: `(function(w){
    var rest = {};
    rest.methods = ['get', 'post', 'put', 'del'];
    rest.offline = true;
    rest.before = function(params) {
        //TODO
        console.log('sentData', params);
    };

    rest.after = function(params) {
        //TODO
        console.log('gotData', params);
    };

    if (rest.offline) {
        rest.get = function(url, data, okCallback, failCallback) {
            rest.before(arguments);
            if ('function' === typeof(data)) {
                failCallback = okCallback;
                okCallback = data;
                data = {};
            }
            $.getJSON(url, data, function(data, textStatus, jqXHR){
                okCallback(data, textStatus, jqXHR);
                rest.after(data, textStatus, jqXHR);
            });
        };
        rest.post = rest.put = rest.del = rest.get;
    } else {
        var len =  rest.methods.length;
        for (var i = 0; i < len; i++) {
            (function(){
                var methodName = rest.methods[i];
                rest[methodName] = function(url, data, okCallback, failCallback) {
                    if ('function' === typeof(data)) {
                        failCallback = okCallback;
                        okCallback = data;
                        data = {};
                    }
                    ('del' === methodName) && (methodName = 'delete');
                    if (!failCallback) {
                        failCallback = function(jqXHR, textStatus, errorThrown) {
                            console.error(jqXHR, textStatus, errorThrown);
                        };
                    }
                    rest.before(arguments);
                    $.ajax({
                        dataType: 'json',
                        type: methodName,
                        url: url,
                        data: data,
                        success: okCallback,
                        fail: failCallback,
                        complete: rest.after
                    });
                };
            })();
        }
    }

    if ( typeof define === "function") {
        if (define.amd || define.cmd) {
            define('rest', [], function() {
                return rest;
            });
        }
    } else {
        w.rest = rest;
    }
  })(window);
  `,
  less: `// variables
  @primary-color: #007bff;
  @secondary-color: #6c757d;
  @border-radius: 5px;

  // mixins
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // main styles
  body {
    font-family: Arial, sans-serif;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .header {
    background-color: @primary-color;
    color: white;
    padding: 10px;
  }

  .footer {
    background-color: @secondary-color;
    color: white;
    padding: 10px;
  }

  .button {
    background-color: @primary-color;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: @border-radius;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darken(@primary-color, 10%);
    }
  }

  .card {
    background-color: white;
    border-radius: @border-radius;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }`,
  markdown: `# Turndown Demo

  This demonstrates [turndown](https://github.com/mixmark-io/turndown) – an HTML to Markdown converter in JavaScript.

  ## Usage

  \`\`\`js
  var turndownService = new TurndownService()
    console.log(
      turndownService.turndown('<h1>Hello world</h1>')
    )
  \`\`\`

  * * *

  It aims to be [CommonMark](http://commonmark.org/) compliant, and includes options to style the output. These options include:

  -   headingStyle (setext or atx)
  -   horizontalRule (\*, -, or \_)
  -   bullet (\*, -, or +)
  -   codeBlockStyle (indented or fenced)
  -   fence (~ or ~)
  -   emDelimiter (\_ or \*)
  -   strongDelimiter (\*\* or \_\_)
  -   linkStyle (inlined or referenced)
  -   linkReferenceStyle (full, collapsed, or shortcut)
  `,
  python: `# encoding:utf-8
  import requests
  import base64
  import cv2
  import numpy as np
  from PIL import Image

  source_folder = 'D:\\Workspace\\personal\\python\\small-tools\\images\\source'
  temp_folder = 'D:\\Workspace\\personal\\python\\small-tools\\images\\temp'
  dist_folder = 'D:\\Workspace\\personal\\python\\small-tools\\images\\dist'
  image_name = 'avatar.png'

  def fetch_access_token(client_key, client_secret):
    # client_id 为官网获取的AK， client_secret 为官网获取的SK
    url = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=%s&client_secret=%s'%(client_key, client_secret)
    response = requests.get(url)
    if response:
      return response.json().get('access_token')

  def portrait_split(access_token):
    url = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/body_seg?access_token=%s' % access_token
    # 二进制方式打开图片文件
    f = open('%s\\%s' % (source_folder, image_name), 'rb')
    img = base64.b64encode(f.read())

    params = {'image': img}
    headers = {'content-type': 'application/x-www-form-urlencoded'}
    response = requests.post(url, data=params, headers=headers)

    return response.json()

  def download_labelmap_image(labelmap):
    labelmap = base64.b64decode(labelmap)
    nparr = np.frombuffer(labelmap, np.uint8)
    label_img = cv2.imdecode(nparr, 1)
    # width, height为图片原始宽、高
    width = label_img.shape[1]
    height = label_img.shape[0]
    label_img = cv2.resize(label_img, (width, height), interpolation=cv2.INTER_NEAREST)
    im_new = np.where(label_img == 1, 255, label_img)
    cv2.imwrite('%s\\label_%s' % (temp_folder, image_name), im_new)

  def download_foreimage(foreground):
    foreimage_url = '%s\\foreground_%s' % (temp_folder, image_name)
    with open(foreimage_url, 'wb') as f:
      f.write(base64.b64decode(foreground))

  def download_scoremap_image(scoremap):
    image_score_url = '%s\\score_%s' % (temp_folder, image_name)
    with open(image_score_url, 'wb') as f:
      f.write(base64.b64decode(scoremap))

  def combine_image(foreimage, baseimage, rate):
    baseimage_pillow = Image.open(baseimage)
    base_width, base_height = baseimage_pillow.size

    foreimage_pillow = Image.open(foreimage)
    fore_width, fore_height = foreimage_pillow.size

    # 将前景安装指定的比例进行缩放以适应背景大小
    foreimage_pillow = foreimage_pillow.resize((int(fore_width * rate), int(fore_height * rate)))
    fore_width, fore_height = foreimage_pillow.size

    # 分离通道
    r, g, b, a = foreimage_pillow.split()
    box = (int(base_width / 2 - fore_width / 2), base_height - fore_height,
            int(base_width / 2 + fore_width / 2), base_height)

    # 将前景粘贴到背景中
    baseimage_pillow.paste(foreimage_pillow, box, mask=a)

    # 返回粘贴合成好的照片
    return baseimage_pillow


  if __name__ == "__main__":
    access_token = fetch_access_token('XCq******hl8Yh****CQ4Na5', 'Qjnecnab*********5ZO78G****4beBE')
    res = portrait_split(access_token)

    download_scoremap_image(res.get('scoremap'))

    download_foreimage(res.get('foreground'))

    download_labelmap_image(res.get('labelmap'))

    baseimage_url = '%s\\bg.jpg' % source_folder
    foreimage_url = '%s\\foreground_%s' % (temp_folder, image_name)
    combined_image_url = '%s\\combined_%s' % (dist_folder, image_name)
    combine_image(foreimage_url, baseimage_url, 10).save(combined_image_url)
  `,
  sql: `SELECT start_time, COUNT(DISTINCT lesson_uid) AS count FROM (SELECT FROM_UNIXTIME(s.start_time / 1000, '%Y-%m-%d') AS start_time, s.lesson_uid AS lesson_uid FROM \`audio_xx_tickets_summary\` s JOIN \`audio_xx_tickets_detail\` d ON d.ticket_id = s.ticket_id WHERE s.start_time BETWEEN 1561939200000 AND 1562630399000 AND s.ticket_bu = 2 AND d.message_page LIKE '%杂音%') temp1 GROUP BY start_time ORDER BY start_time DESC

  SELECT start_time, COUNT(DISTINCT lesson_uid) AS count FROM (SELECT FROM_UNIXTIME(s.start_time / 1000, '%Y-%m-%d') AS start_time, s.lesson_uid AS lesson_uid FROM \`audio_xx_tickets_summary\` s JOIN \`audio_xx_tickets_detail\` d ON d.ticket_id = s.ticket_id WHERE s.start_time BETWEEN 1561939200000 AND 1562630399000 AND s.ticket_bu = 2 AND d.message_page LIKE '%回音%') temp1 GROUP BY start_time ORDER BY start_time DESC

  SELECT start_time, COUNT(DISTINCT lesson_uid) AS count FROM (SELECT FROM_UNIXTIME(s.start_time / 1000, '%Y-%m-%d') AS start_time, s.lesson_uid AS lesson_uid FROM \`audio_xx_tickets_summary\` s JOIN \`audio_xx_tickets_detail\` d ON d.ticket_id = s.ticket_id WHERE s.start_time BETWEEN 1561939200000 AND 1562630399000 AND s.ticket_bu = 2) temp1 GROUP BY start_time ORDER BY start_time DESC

  SELECT
    i.stat_date AS "time",
    ROUND(COUNT(i.id) / temp2.total * 100, 2) AS "value",
    IF(i.audio_name='','Unknown',i.audio_name) AS "metric"
  FROM \`tb_avs_xx_day_ticket_info\` i
  LEFT JOIN (
    SELECT
      stat_date,
      COUNT(id) AS total
    FROM \`tb_avs_xx_day_ticket_info\`
    GROUP BY stat_date
  ) temp2
  ON i.stat_date = temp2.stat_date
  WHERE
    i.audio_name IN (
      SELECT
        audio_name
      FROM (
        SELECT
          COUNT(id) AS count,
          audio_name
        FROM \`tb_avs_xx_day_ticket_info\`
        GROUP BY audio_name
        ORDER BY count DESC
        LIMIT 0, 20
      ) temp1
    )
  GROUP BY i.stat_date, i.audio_name
  ORDER BY i.stat_date DESC
  `,
  typescript: `/* eslint-disable no-restricted-globals */
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
  `,
  yaml: `name: CI

  on:
    push:
      branches:
        - main

  jobs:
    build:
      runs-on: ubuntu-latest

      steps:
        - name: Checkout repository
          uses: actions/checkout@v2

        - name: Install dependencies
          run: npm install

        - name: Build project
          run: npm run build

        - name: Run tests
          run: npm test`,
};

const themeOptions = ['dark', 'light']
  .concat(Object.keys(alls))
  .filter(item => typeof alls[item as keyof typeof alls] !== 'function')
  .filter(item => !/^(defaultSettings)/.test(item as keyof typeof alls));
const heightOptions = ['auto', '200px', '300px', '500px'];

export default function Base() {
  const [content, setContent] = React.useState<string>(LanguageDemo.html);
  const [language, setLanguage] = React.useState<LanguageName>('html');
  const [theme, setTheme] = React.useState<TMirrorEditorTheme>('dark');
  const [height, setHeight] = React.useState<string>('500px');
  const [placeholder, setPlaceholder] = React.useState<string>('请输入内容');
  const [autofocus, setAutofocus] = React.useState<boolean>(false);
  const [editable, setEditable] = React.useState<boolean>(true);

  const onDidChangeTheme = (callback: (theme: 'dark' | 'light') => void) => {
    const root = document.querySelector('html');

    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          if (root?.getAttribute('data-prefers-color') === 'dark') {
            callback('dark');
          } else {
            callback('light');
          }
        }
      }
    });

    observer.observe(root, { attributes: true });

    return () => {
      observer.disconnect();
    };
  };

  return (
    <ConfigProvider locale={zhCN}>
      <MirrorEditor
        editable={editable}
        autoFocus={autofocus}
        placeholder={placeholder}
        height={height}
        value={content}
        language={language}
        theme={theme}
        onChange={val => {
          setContent(val);
        }}
        getWebAppTheme={() => {
          return document.querySelector('html')?.getAttribute('data-prefers-color') === 'dark'
            ? 'dark'
            : 'light';
        }}
        onWebAppThemeChange={onDidChangeTheme}
      />

      <Divider />

      <Row gutter={16}>
        <Col span={8}>
          <Row align="middle">
            <Col flex="80px">语言:</Col>
            <Col flex="1">
              <Select
                value={language}
                style={{ width: '100%' }}
                onChange={val => {
                  setContent(LanguageDemo[val] || '');
                  setLanguage(val);
                }}
                showSearch
              >
                {Object.keys(langs)
                  .sort()
                  .map(item => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row align="middle">
            <Col flex="80px">主题:</Col>
            <Col flex="1">
              <Select
                value={theme}
                style={{ width: '100%' }}
                onChange={val => {
                  setTheme(val);
                }}
                showSearch
              >
                {themeOptions.map(item => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row align="middle">
            <Col flex="80px">高度:</Col>
            <Col flex="1">
              <Select
                value={height}
                style={{ width: '100%' }}
                onChange={val => {
                  setHeight(val);
                }}
                showSearch
              >
                {heightOptions.map(item => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={8}>
          <Row align="middle">
            <Col flex="80px">placeholder:</Col>
            <Col flex="1">
              <Input
                style={{ width: '100' }}
                value={placeholder}
                onChange={event => {
                  setPlaceholder(event.target.value);
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row align="middle">
            <Col flex="80px">自动聚焦:</Col>
            <Col flex="1">
              <Checkbox
                checked={autofocus}
                onChange={event => {
                  setAutofocus(event.target.checked);
                }}
              >
                自动聚焦
              </Checkbox>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row align="middle">
            <Col flex="80px">是否可编辑:</Col>
            <Col flex="1">
              <Checkbox
                checked={editable}
                onChange={event => {
                  setEditable(event.target.checked);
                }}
              >
                可编辑
              </Checkbox>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={8}>
          <Button
            onClick={() => {
              setContent('');
            }}
          >
            清空内容
          </Button>
        </Col>
      </Row>
    </ConfigProvider>
  );
}
