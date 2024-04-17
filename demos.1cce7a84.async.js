"use strict";(self.webpackChunk_hankliu_rc_mirror_editor=self.webpackChunk_hankliu_rc_mirror_editor||[]).push([[433,763],{8183:function(K,l,e){e.r(l),e.d(l,{default:function(){return un}});var p=e(15427),E=e.n(p),b=e(76531),c=e.n(b),r=e(91814),t=e.n(r),v=e(63430),k=e.n(v),a=e(37047),D=e.n(a),h=e(61456),O=e.n(h),_=e(50254),gn=e.n(_),z=e(67375),n=e.n(z),V=e(22325),vn=e.n(V),J=e(69399),P=e.n(J),Sn=e(93397),Pn=e.n(Sn),yn=e(91228),Q=e.n(yn),Cn=e(84915),Rn=e.n(Cn),xn=e(32027),m=e.n(xn),o=e(92035),u=e.n(o),I=e(19596),$=e.n(I),M=e(64599),N=e.n(M),T=e(5574),S=e.n(T),A=e(70763),B=e(67939),y=e(67294),i=e(85893),j={html:`<h1>Turndown Demo</h1>

  <p>This demonstrates <a href="https://github.com/mixmark-io/turndown">turndown</a> \u2013 an HTML to Markdown converter in JavaScript.</p>

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
  `,javascript:`(function(w){
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
  `,less:`// variables
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
  }`,markdown:`# Turndown Demo

  This demonstrates [turndown](https://github.com/mixmark-io/turndown) \u2013 an HTML to Markdown converter in JavaScript.

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
  -   horizontalRule (*, -, or _)
  -   bullet (*, -, or +)
  -   codeBlockStyle (indented or fenced)
  -   fence (~ or ~)
  -   emDelimiter (_ or *)
  -   strongDelimiter (** or __)
  -   linkStyle (inlined or referenced)
  -   linkReferenceStyle (full, collapsed, or shortcut)
  `,python:`# encoding:utf-8
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
    # client_id \u4E3A\u5B98\u7F51\u83B7\u53D6\u7684AK\uFF0C client_secret \u4E3A\u5B98\u7F51\u83B7\u53D6\u7684SK
    url = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=%s&client_secret=%s'%(client_key, client_secret)
    response = requests.get(url)
    if response:
      return response.json().get('access_token')

  def portrait_split(access_token):
    url = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/body_seg?access_token=%s' % access_token
    # \u4E8C\u8FDB\u5236\u65B9\u5F0F\u6253\u5F00\u56FE\u7247\u6587\u4EF6
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
    # width, height\u4E3A\u56FE\u7247\u539F\u59CB\u5BBD\u3001\u9AD8
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

    # \u5C06\u524D\u666F\u5B89\u88C5\u6307\u5B9A\u7684\u6BD4\u4F8B\u8FDB\u884C\u7F29\u653E\u4EE5\u9002\u5E94\u80CC\u666F\u5927\u5C0F
    foreimage_pillow = foreimage_pillow.resize((int(fore_width * rate), int(fore_height * rate)))
    fore_width, fore_height = foreimage_pillow.size

    # \u5206\u79BB\u901A\u9053
    r, g, b, a = foreimage_pillow.split()
    box = (int(base_width / 2 - fore_width / 2), base_height - fore_height,
            int(base_width / 2 + fore_width / 2), base_height)

    # \u5C06\u524D\u666F\u7C98\u8D34\u5230\u80CC\u666F\u4E2D
    baseimage_pillow.paste(foreimage_pillow, box, mask=a)

    # \u8FD4\u56DE\u7C98\u8D34\u5408\u6210\u597D\u7684\u7167\u7247
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
  `,sql:`SELECT start_time, COUNT(DISTINCT lesson_uid) AS count FROM (SELECT FROM_UNIXTIME(s.start_time / 1000, '%Y-%m-%d') AS start_time, s.lesson_uid AS lesson_uid FROM \`audio_xx_tickets_summary\` s JOIN \`audio_xx_tickets_detail\` d ON d.ticket_id = s.ticket_id WHERE s.start_time BETWEEN 1561939200000 AND 1562630399000 AND s.ticket_bu = 2 AND d.message_page LIKE '%\u6742\u97F3%') temp1 GROUP BY start_time ORDER BY start_time DESC

  SELECT start_time, COUNT(DISTINCT lesson_uid) AS count FROM (SELECT FROM_UNIXTIME(s.start_time / 1000, '%Y-%m-%d') AS start_time, s.lesson_uid AS lesson_uid FROM \`audio_xx_tickets_summary\` s JOIN \`audio_xx_tickets_detail\` d ON d.ticket_id = s.ticket_id WHERE s.start_time BETWEEN 1561939200000 AND 1562630399000 AND s.ticket_bu = 2 AND d.message_page LIKE '%\u56DE\u97F3%') temp1 GROUP BY start_time ORDER BY start_time DESC

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
  `,typescript:`/* eslint-disable no-restricted-globals */
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
                  ? \`Incomplete, expect next input: 
\${parseResult.error.suggestions
                      .map((each) => {
                        return each.value;
                      })
                      .join("
")}\`
                  : \`Wrong input, expect: 
\${parseResult.error.suggestions
                      .map((each) => {
                        return each.value;
                      })
                      .join("
")}\`;

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
            // \u5B57\u6BB5 . \u540E\u9762\u7684\u90E8\u5206
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

  // \u5B9E\u4F8B\u5316\u4E00\u4E2A worker
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
  `,yaml:`name: CI

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
          run: npm test`},H=["dark","light"].concat(Object.keys(A.alls)).filter(function(L){return typeof A.alls[L]!="function"}).filter(function(L){return!/^(defaultSettings)/.test(L)}),F=["auto","200px","300px","500px"];function un(){var L=y.useState(j.html),W=S()(L,2),Z=W[0],C=W[1],ln=y.useState("html"),G=S()(ln,2),Y=G[0],w=G[1],q=y.useState("dark"),nn=S()(q,2),en=nn[0],dn=nn[1],U=y.useState("500px"),tn=S()(U,2),g=tn[0],rn=tn[1],R=y.useState("\u8BF7\u8F93\u5165\u5185\u5BB9"),on=S()(R,2),cn=on[0],_n=on[1],On=y.useState(!1),hn=S()(On,2),kn=hn[0],Dn=hn[1],In=y.useState(!0),pn=S()(In,2),En=pn[0],mn=pn[1],X=function(d){var an=document.querySelector("html"),sn=new MutationObserver(function(fn){var f=N()(fn),x;try{for(f.s();!(x=f.n()).done;){var Mn=x.value;Mn.type==="attributes"&&((an==null?void 0:an.getAttribute("data-prefers-color"))==="dark"?d("dark"):d("light"))}}catch(bn){f.e(bn)}finally{f.f()}});return sn.observe(an,{attributes:!0}),function(){sn.disconnect()}};return(0,i.jsxs)(c(),{locale:B.default,children:[(0,i.jsx)(A.default,{editable:En,autoFocus:kn,placeholder:cn,height:g,value:Z,language:Y,theme:en,onChange:function(d){C(d)},getWebAppTheme:function(){var d;return((d=document.querySelector("html"))===null||d===void 0?void 0:d.getAttribute("data-prefers-color"))==="dark"?"dark":"light"},onWebAppThemeChange:X}),(0,i.jsx)($(),{}),(0,i.jsxs)(P(),{gutter:16,children:[(0,i.jsx)(m(),{span:8,children:(0,i.jsxs)(P(),{align:"middle",children:[(0,i.jsx)(m(),{flex:"80px",children:"\u8BED\u8A00:"}),(0,i.jsx)(m(),{flex:"1",children:(0,i.jsx)(Q(),{value:Y,style:{width:"100%"},onChange:function(d){C(j[d]||""),w(d)},showSearch:!0,children:Object.keys(A.langs).sort().map(function(s){return(0,i.jsx)(Q().Option,{value:s,children:s},s)})})})]})}),(0,i.jsx)(m(),{span:8,children:(0,i.jsxs)(P(),{align:"middle",children:[(0,i.jsx)(m(),{flex:"80px",children:"\u4E3B\u9898:"}),(0,i.jsx)(m(),{flex:"1",children:(0,i.jsx)(Q(),{value:en,style:{width:"100%"},onChange:function(d){dn(d)},showSearch:!0,children:H.map(function(s){return(0,i.jsx)(Q().Option,{value:s,children:s},s)})})})]})}),(0,i.jsx)(m(),{span:8,children:(0,i.jsxs)(P(),{align:"middle",children:[(0,i.jsx)(m(),{flex:"80px",children:"\u9AD8\u5EA6:"}),(0,i.jsx)(m(),{flex:"1",children:(0,i.jsx)(Q(),{value:g,style:{width:"100%"},onChange:function(d){rn(d)},showSearch:!0,children:F.map(function(s){return(0,i.jsx)(Q().Option,{value:s,children:s},s)})})})]})})]}),(0,i.jsxs)(P(),{gutter:16,style:{marginTop:"16px"},children:[(0,i.jsx)(m(),{span:8,children:(0,i.jsxs)(P(),{align:"middle",children:[(0,i.jsx)(m(),{flex:"80px",children:"placeholder:"}),(0,i.jsx)(m(),{flex:"1",children:(0,i.jsx)(n(),{style:{width:"100"},value:cn,onChange:function(d){_n(d.target.value)}})})]})}),(0,i.jsx)(m(),{span:8,children:(0,i.jsxs)(P(),{align:"middle",children:[(0,i.jsx)(m(),{flex:"80px",children:"\u81EA\u52A8\u805A\u7126:"}),(0,i.jsx)(m(),{flex:"1",children:(0,i.jsx)(O(),{checked:kn,onChange:function(d){Dn(d.target.checked)},children:"\u81EA\u52A8\u805A\u7126"})})]})}),(0,i.jsx)(m(),{span:8,children:(0,i.jsxs)(P(),{align:"middle",children:[(0,i.jsx)(m(),{flex:"80px",children:"\u662F\u5426\u53EF\u7F16\u8F91:"}),(0,i.jsx)(m(),{flex:"1",children:(0,i.jsx)(O(),{checked:En,onChange:function(d){mn(d.target.checked)},children:"\u53EF\u7F16\u8F91"})})]})})]}),(0,i.jsx)(P(),{gutter:16,style:{marginTop:"16px"},children:(0,i.jsx)(m(),{span:8,children:(0,i.jsx)(k(),{onClick:function(){C("")},children:"\u6E05\u7A7A\u5185\u5BB9"})})})]})}},86478:function(K,l,e){e.r(l),e.d(l,{default:function(){return v}});var p=e(5574),E=e.n(p),b=e(70763),c=e(67294),r=e(85893),t=`(function(w){
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
`;function v(){var k=c.useState(t),a=E()(k,2),D=a[0],h=a[1];return(0,r.jsx)("div",{style:{backgroundColor:"#000",padding:"20px",borderRadius:"4px"},children:(0,r.jsx)(b.default,{height:400,value:D,language:"javascript",onChange:function(_){h(_)},theme:"vscodeDark"})})}},35979:function(K,l,e){e.r(l),e.d(l,{default:function(){return v}});var p=e(5574),E=e.n(p),b=e(70763),c=e(67294),r=e(85893),t=`// variables
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
}`;function v(){var k=c.useState(t),a=E()(k,2),D=a[0],h=a[1];return(0,r.jsx)("div",{children:(0,r.jsx)(b.default,{height:400,value:D,language:"less",onChange:function(_){h(_)},theme:"atomone"})})}},87867:function(K,l,e){e.r(l),e.d(l,{default:function(){return v}});var p=e(5574),E=e.n(p),b=e(70763),c=e(67294),r=e(85893),t=`# Turndown Demo

This demonstrates [turndown](https://github.com/mixmark-io/turndown) \u2013 an HTML to Markdown converter in JavaScript.

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
-   horizontalRule (*, -, or _)
-   bullet (*, -, or +)
-   codeBlockStyle (indented or fenced)
-   fence (~ or ~)
-   emDelimiter (_ or *)
-   strongDelimiter (** or __)
-   linkStyle (inlined or referenced)
-   linkReferenceStyle (full, collapsed, or shortcut)
`;function v(){var k=c.useState(t),a=E()(k,2),D=a[0],h=a[1];return(0,r.jsx)("div",{children:(0,r.jsx)(b.default,{height:400,value:D,language:"markdown",onChange:function(_){h(_)},theme:"light"})})}},42910:function(K,l,e){e.r(l),e.d(l,{default:function(){return v}});var p=e(5574),E=e.n(p),b=e(70763),c=e(67294),r=e(85893),t=`# encoding:utf-8
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
  # client_id \u4E3A\u5B98\u7F51\u83B7\u53D6\u7684AK\uFF0C client_secret \u4E3A\u5B98\u7F51\u83B7\u53D6\u7684SK
  url = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=%s&client_secret=%s'%(client_key, client_secret)
  response = requests.get(url)
  if response:
    return response.json().get('access_token')

def portrait_split(access_token):
  url = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/body_seg?access_token=%s' % access_token
  # \u4E8C\u8FDB\u5236\u65B9\u5F0F\u6253\u5F00\u56FE\u7247\u6587\u4EF6
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
  # width, height\u4E3A\u56FE\u7247\u539F\u59CB\u5BBD\u3001\u9AD8
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

  # \u5C06\u524D\u666F\u5B89\u88C5\u6307\u5B9A\u7684\u6BD4\u4F8B\u8FDB\u884C\u7F29\u653E\u4EE5\u9002\u5E94\u80CC\u666F\u5927\u5C0F
  foreimage_pillow = foreimage_pillow.resize((int(fore_width * rate), int(fore_height * rate)))
  fore_width, fore_height = foreimage_pillow.size

  # \u5206\u79BB\u901A\u9053
  r, g, b, a = foreimage_pillow.split()
  box = (int(base_width / 2 - fore_width / 2), base_height - fore_height,
          int(base_width / 2 + fore_width / 2), base_height)

  # \u5C06\u524D\u666F\u7C98\u8D34\u5230\u80CC\u666F\u4E2D
  baseimage_pillow.paste(foreimage_pillow, box, mask=a)

  # \u8FD4\u56DE\u7C98\u8D34\u5408\u6210\u597D\u7684\u7167\u7247
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
`;function v(){var k=c.useState(t),a=E()(k,2),D=a[0],h=a[1];return(0,r.jsx)("div",{children:(0,r.jsx)(b.default,{height:400,value:D,language:"python",onChange:function(_){h(_)},theme:"abyss"})})}},39187:function(K,l,e){e.r(l),e.d(l,{default:function(){return v}});var p=e(5574),E=e.n(p),b=e(70763),c=e(67294),r=e(85893),t=`SELECT start_time, COUNT(DISTINCT lesson_uid) AS count FROM (SELECT FROM_UNIXTIME(s.start_time / 1000, '%Y-%m-%d') AS start_time, s.lesson_uid AS lesson_uid FROM \`audio_xx_tickets_summary\` s JOIN \`audio_xx_tickets_detail\` d ON d.ticket_id = s.ticket_id WHERE s.start_time BETWEEN 1561939200000 AND 1562630399000 AND s.ticket_bu = 2 AND d.message_page LIKE '%\u6742\u97F3%') temp1 GROUP BY start_time ORDER BY start_time DESC

SELECT start_time, COUNT(DISTINCT lesson_uid) AS count FROM (SELECT FROM_UNIXTIME(s.start_time / 1000, '%Y-%m-%d') AS start_time, s.lesson_uid AS lesson_uid FROM \`audio_xx_tickets_summary\` s JOIN \`audio_xx_tickets_detail\` d ON d.ticket_id = s.ticket_id WHERE s.start_time BETWEEN 1561939200000 AND 1562630399000 AND s.ticket_bu = 2 AND d.message_page LIKE '%\u56DE\u97F3%') temp1 GROUP BY start_time ORDER BY start_time DESC

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
`;function v(){var k=c.useState(t),a=E()(k,2),D=a[0],h=a[1];return(0,r.jsx)("div",{children:(0,r.jsx)(b.default,{height:400,value:D,language:"sql",onChange:function(_){h(_)},theme:"copilot"})})}},25279:function(K,l,e){e.r(l),e.d(l,{default:function(){return v}});var p=e(5574),E=e.n(p),b=e(70763),c=e(67294),r=e(85893),t=`/* eslint-disable no-restricted-globals */
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
                ? \`Incomplete, expect next input: 
\${parseResult.error.suggestions
                    .map((each) => {
                      return each.value;
                    })
                    .join("
")}\`
                : \`Wrong input, expect: 
\${parseResult.error.suggestions
                    .map((each) => {
                      return each.value;
                    })
                    .join("
")}\`;

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
          // \u5B57\u6BB5 . \u540E\u9762\u7684\u90E8\u5206
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

// \u5B9E\u4F8B\u5316\u4E00\u4E2A worker
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
`;function v(){var k=c.useState(t),a=E()(k,2),D=a[0],h=a[1];return(0,r.jsx)("div",{children:(0,r.jsx)(b.default,{height:400,value:D,language:"typescript",onChange:function(_){h(_)},theme:"eclipse"})})}},32001:function(K,l,e){e.r(l),e.d(l,{default:function(){return v}});var p=e(5574),E=e.n(p),b=e(70763),c=e(67294),r=e(85893),t=`name: CI

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
        run: npm test`;function v(){var k=c.useState(t),a=E()(k,2),D=a[0],h=a[1];return(0,r.jsx)("div",{children:(0,r.jsx)(b.default,{height:400,value:D,language:"yaml",onChange:function(_){h(_)},theme:"githubLight"})})}},70763:function(K,l,e){e.r(l),e.d(l,{Annotation:function(){return r.q6},AnnotationType:function(){return r.JJ},BidiSpan:function(){return t.CZ},BlockInfo:function(){return t.td},BlockType:function(){return t.kH},ChangeDesc:function(){return r.n0},ChangeSet:function(){return r.as},CharCategory:function(){return r.D0},Compartment:function(){return r.F6},Decoration:function(){return t.p},Direction:function(){return t.Nm},EditorSelection:function(){return r.jT},EditorState:function(){return r.yy},EditorView:function(){return t.tk},External:function(){return vn},Facet:function(){return r.r$},GutterMarker:function(){return t.SJ},Line:function(){return r.x1},MapMode:function(){return r.gc},MatchDecorator:function(){return t.Y1},Prec:function(){return r.Wl},Range:function(){return r.e6},RangeSet:function(){return r.Xs},RangeSetBuilder:function(){return r.f_},RangeValue:function(){return r.uU},RectangleMarker:function(){return t.dc},SelectionRange:function(){return r.xm},StateEffect:function(){return r.Py},StateEffectType:function(){return r.D6},StateField:function(){return r.QQ},Text:function(){return r.xv},Transaction:function(){return r.YW},ViewPlugin:function(){return t.lg},ViewUpdate:function(){return t.TB},WidgetType:function(){return t.l9},__test:function(){return t.$X},abcdef:function(){return n.abcdef},abcdefInit:function(){return n.abcdefInit},abyss:function(){return n.abyss},abyssInit:function(){return n.abyssInit},alls:function(){return n},androidstudio:function(){return n.androidstudio},androidstudioInit:function(){return n.androidstudioInit},andromeda:function(){return n.andromeda},andromedaInit:function(){return n.andromedaInit},atomone:function(){return n.atomone},atomoneInit:function(){return n.atomoneInit},aura:function(){return n.aura},auraInit:function(){return n.auraInit},basicDark:function(){return n.basicDark},basicDarkInit:function(){return n.basicDarkInit},basicLight:function(){return n.basicLight},basicLightInit:function(){return n.basicLightInit},basicSetup:function(){return gn.X},bbedit:function(){return n.bbedit},bbeditInit:function(){return n.bbeditInit},bespin:function(){return n.bespin},bespinInit:function(){return n.bespinInit},closeHoverTooltips:function(){return t.E8},codePointAt:function(){return r.gm},codePointSize:function(){return r.nZ},color:function(){return _.$_},combineConfig:function(){return r.BO},consoleDark:function(){return n.consoleDark},consoleDarkInit:function(){return n.consoleDarkInit},consoleLight:function(){return n.consoleLight},consoleLightInit:function(){return n.consoleLightInit},copilot:function(){return n.copilot},copilotInit:function(){return n.copilotInit},countColumn:function(){return r.IS},crosshairCursor:function(){return t.S2},darcula:function(){return n.darcula},darculaInit:function(){return n.darculaInit},default:function(){return m},defaultSettingsAbcdef:function(){return n.defaultSettingsAbcdef},defaultSettingsAbyss:function(){return n.defaultSettingsAbyss},defaultSettingsAndroidstudio:function(){return n.defaultSettingsAndroidstudio},defaultSettingsAndromeda:function(){return n.defaultSettingsAndromeda},defaultSettingsAtomone:function(){return n.defaultSettingsAtomone},defaultSettingsAura:function(){return n.defaultSettingsAura},defaultSettingsBasicDark:function(){return n.defaultSettingsBasicDark},defaultSettingsBasicLight:function(){return n.defaultSettingsBasicLight},defaultSettingsBbedit:function(){return n.defaultSettingsBbedit},defaultSettingsBespin:function(){return n.defaultSettingsBespin},defaultSettingsConsoleDark:function(){return n.defaultSettingsConsoleDark},defaultSettingsConsoleLight:function(){return n.defaultSettingsConsoleLight},defaultSettingsCopilot:function(){return n.defaultSettingsCopilot},defaultSettingsDarcula:function(){return n.defaultSettingsDarcula},defaultSettingsDracula:function(){return n.defaultSettingsDracula},defaultSettingsDuotoneDark:function(){return n.defaultSettingsDuotoneDark},defaultSettingsDuotoneLight:function(){return n.defaultSettingsDuotoneLight},defaultSettingsEclipse:function(){return n.defaultSettingsEclipse},defaultSettingsGithubDark:function(){return n.defaultSettingsGithubDark},defaultSettingsGithubLight:function(){return n.defaultSettingsGithubLight},defaultSettingsGruvboxDark:function(){return n.defaultSettingsGruvboxDark},defaultSettingsGruvboxLight:function(){return n.defaultSettingsGruvboxLight},defaultSettingsKimbie:function(){return n.defaultSettingsKimbie},defaultSettingsMaterial:function(){return n.defaultSettingsMaterial},defaultSettingsMaterialDark:function(){return n.defaultSettingsMaterialDark},defaultSettingsMaterialLight:function(){return n.defaultSettingsMaterialLight},defaultSettingsMonokai:function(){return n.defaultSettingsMonokai},defaultSettingsMonokaiDimmed:function(){return n.defaultSettingsMonokaiDimmed},defaultSettingsNoctisLilac:function(){return n.defaultSettingsNoctisLilac},defaultSettingsNord:function(){return n.defaultSettingsNord},defaultSettingsOkaidia:function(){return n.defaultSettingsOkaidia},defaultSettingsQuietlight:function(){return n.defaultSettingsQuietlight},defaultSettingsRed:function(){return n.defaultSettingsRed},defaultSettingsSolarizedDark:function(){return n.defaultSettingsSolarizedDark},defaultSettingsSolarizedLight:function(){return n.defaultSettingsSolarizedLight},defaultSettingsSublime:function(){return n.defaultSettingsSublime},defaultSettingsTokyoNight:function(){return n.defaultSettingsTokyoNight},defaultSettingsTokyoNightDay:function(){return n.defaultSettingsTokyoNightDay},defaultSettingsTokyoNightStorm:function(){return n.defaultSettingsTokyoNightStorm},defaultSettingsTomorrowNightBlue:function(){return n.defaultSettingsTomorrowNightBlue},defaultSettingsVscodeDark:function(){return n.defaultSettingsVscodeDark},defaultSettingsWhiteDark:function(){return n.defaultSettingsWhiteDark},defaultSettingsWhiteLight:function(){return n.defaultSettingsWhiteLight},defaultSettingsXcodeDark:function(){return n.defaultSettingsXcodeDark},defaultSettingsXcodeLight:function(){return n.defaultSettingsXcodeLight},dracula:function(){return n.dracula},draculaInit:function(){return n.draculaInit},drawSelection:function(){return t.Uw},dropCursor:function(){return t.qr},duotoneDark:function(){return n.duotoneDark},duotoneDarkInit:function(){return n.duotoneDarkInit},duotoneLight:function(){return n.duotoneLight},duotoneLightInit:function(){return n.duotoneLightInit},eclipse:function(){return n.eclipse},eclipseInit:function(){return n.eclipseInit},findClusterBreak:function(){return r.cp},findColumn:function(){return r.Gz},fromCodePoint:function(){return r.bg},getDefaultExtensions:function(){return J},getDrawSelectionConfig:function(){return t.HM},getPanel:function(){return t.Sd},getTooltip:function(){return t.gB},githubDark:function(){return n.githubDark},githubDarkInit:function(){return n.githubDarkInit},githubLight:function(){return n.githubLight},githubLightInit:function(){return n.githubLightInit},gruvboxDark:function(){return n.gruvboxDark},gruvboxDarkInit:function(){return n.gruvboxDarkInit},gruvboxLight:function(){return n.gruvboxLight},gruvboxLightInit:function(){return n.gruvboxLightInit},gutter:function(){return t.v5},gutterLineClass:function(){return t.v7},gutters:function(){return t.lc},hasHoverTooltips:function(){return t.Dm},highlightActiveLine:function(){return t.ZO},highlightActiveLineGutter:function(){return t.HQ},highlightSpecialChars:function(){return t.AE},highlightTrailingWhitespace:function(){return t.pk},highlightWhitespace:function(){return t.DF},hoverTooltip:function(){return t.bF},keymap:function(){return t.$f},kimbie:function(){return n.kimbie},kimbieInit:function(){return n.kimbieInit},langNames:function(){return z.UD},langs:function(){return z.RI},layer:function(){return t.EY},lineNumberMarkers:function(){return t.p2},lineNumbers:function(){return t.Eu},loadLanguage:function(){return z.vf},logException:function(){return t.OO},material:function(){return n.material},materialDark:function(){return n.materialDark},materialDarkInit:function(){return n.materialDarkInit},materialInit:function(){return n.materialInit},materialLight:function(){return n.materialLight},materialLightInit:function(){return n.materialLightInit},minimalSetup:function(){return gn.w},monokai:function(){return n.monokai},monokaiDimmed:function(){return n.monokaiDimmed},monokaiDimmedInit:function(){return n.monokaiDimmedInit},monokaiInit:function(){return n.monokaiInit},noctisLilac:function(){return n.noctisLilac},noctisLilacInit:function(){return n.noctisLilacInit},nord:function(){return n.nord},nordInit:function(){return n.nordInit},okaidia:function(){return n.okaidia},okaidiaInit:function(){return n.okaidiaInit},oneDark:function(){return _.vk},oneDarkHighlightStyle:function(){return _.VE},oneDarkTheme:function(){return _.pD},panels:function(){return t.h0},placeholder:function(){return t.W$},quietlight:function(){return n.quietlight},quietlightInit:function(){return n.quietlightInit},rectangularSelection:function(){return t.Zs},red:function(){return n.red},redInit:function(){return n.redInit},repositionTooltips:function(){return t.E2},runScopeHandlers:function(){return t.$1},scrollPastEnd:function(){return t.CT},showPanel:function(){return t.mH},showTooltip:function(){return t.hJ},solarizedDark:function(){return n.solarizedDark},solarizedDarkInit:function(){return n.solarizedDarkInit},solarizedLight:function(){return n.solarizedLight},solarizedLightInit:function(){return n.solarizedLightInit},sublime:function(){return n.sublime},sublimeInit:function(){return n.sublimeInit},tokyoNight:function(){return n.tokyoNight},tokyoNightDay:function(){return n.tokyoNightDay},tokyoNightDayInit:function(){return n.tokyoNightDayInit},tokyoNightInit:function(){return n.tokyoNightInit},tokyoNightStorm:function(){return n.tokyoNightStorm},tokyoNightStormInit:function(){return n.tokyoNightStormInit},tomorrowNightBlue:function(){return n.tomorrowNightBlue},tomorrowNightBlueInit:function(){return n.tomorrowNightBlueInit},tooltips:function(){return t.jH},vscodeDark:function(){return n.vscodeDark},vscodeDarkInit:function(){return n.vscodeDarkInit},whiteDark:function(){return n.whiteDark},whiteDarkInit:function(){return n.whiteDarkInit},whiteLight:function(){return n.whiteLight},whiteLightInit:function(){return n.whiteLightInit},xcodeDark:function(){return n.xcodeDark},xcodeDarkInit:function(){return n.xcodeDarkInit},xcodeLight:function(){return n.xcodeLight},xcodeLightInit:function(){return n.xcodeLightInit}});var p=e(9783),E=e.n(p),b=e(97857),c=e.n(b),r=e(78120),t=e(75533),v=e(93967),k=e.n(v),a=e(67294),D=e(19632),h=e.n(D),O=e(45383),_=e(23732),gn=e(86966),z=e(95213),n=e(80088);function V(o){return o===void 0?"":typeof o=="number"?"".concat(o,"px"):o}var vn=r.q6.define(),J=function(){var u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{language:"html"},I=u.indentWithTab,$=I===void 0?!0:I,M=u.editable,N=M===void 0?!0:M,T=u.readOnly,S=T===void 0?!1:T,A=u.theme,B=A===void 0?"light":A,y=u.placeholder,i=y===void 0?"":y,j=u.basicSetup,H=j===void 0?!0:j,F=u.height,un=F===void 0?"100%":F,L=u.minHeight,W=u.maxHeight,Z=u.width,C=Z===void 0?"100%":Z,ln=u.minWidth,G=u.maxWidth,Y=u.onChange,w=u.extensions,q=u.language,nn=u.highlightWhitespace,en=u.highlightActiveLine,dn=t.tk.updateListener.of(function(R){if(R.docChanged&&!R.transactions.some(function(_n){return _n.annotation(vn)})){var on=R.state.doc,cn=on.toString();Y(cn,R)}}),U={height:V(un),minHeight:V(L),maxHeight:V(W),width:V(C),minWidth:V(ln),maxWidth:V(G)};Object.keys(U).forEach(function(R){U[R]||delete U[R]});var tn=t.tk.theme({"&":U,"& .cm-scroller":{height:"100% !important"}}),g=[dn,tn].concat(h()(Array.isArray(w)?w:w?[w]:[]));z.RI[q]&&g.push(z.RI[q]());var rn=h()(O.wQ);switch($&&rn.push(O.oc),g.unshift(t.$f.of(rn)),H&&(typeof H=="boolean"?g.unshift((0,gn.X)()):g.unshift((0,gn.X)(H))),i&&g.unshift((0,t.W$)(i)),nn&&g.unshift((0,t.DF)()),en&&g.unshift((0,t.ZO)()),B){case"light":g.push(n.githubLight);break;case"dark":g.push(_.vk);break;case"none":break;default:g.push((typeof B=="string"?n[B]:B)||B);break}return N===!1&&g.push(t.tk.editable.of(!1)),S&&g.push(r.yy.readOnly.of(!0)),g},P=e(64599),Sn=e.n(P);function Pn(){var o;return(o=document.querySelector("html"))!==null&&o!==void 0&&o.classList.contains("dark")?"dark":"light"}function yn(o){var u=document.querySelector("html"),I=new MutationObserver(function($){var M=Sn()($),N;try{for(M.s();!(N=M.n()).done;){var T=N.value;T.type==="attributes"&&T.attributeName==="class"&&(u!=null&&u.classList.contains("dark")?o("dark"):o("light"))}}catch(S){M.e(S)}finally{M.f()}});return I.observe(u,{attributes:!0}),function(){I.disconnect()}}function Q(){var o=document.querySelector("html");if(o==null||o.classList.add("disable-transitions"),o!=null&&o.classList.contains("dark")){o.classList.remove("dark");try{window.localStorage.setItem("theme","light")}catch(u){}}else{o==null||o.classList.add("dark");try{window.localStorage.setItem("theme","dark")}catch(u){}}window.setTimeout(function(){o==null||o.classList.remove("disable-transitions")},0)}var Cn=e(85893),Rn=(0,a.forwardRef)(function(o,u){var I=o.theme,$=o.prefixCls,M=$===void 0?"hlui-mirror-editor":$,N=o.height,T=N===void 0?"100%":N,S=o.minHeight,A=o.maxHeight,B=o.width,y=B===void 0?"100%":B,i=o.minWidth,j=o.maxWidth,H=o.value,F=H===void 0?"":H,un=o.className,L=o.language,W=L===void 0?"html":L,Z=o.options,C=Z===void 0?{}:Z,ln=o.indentWithTab,G=o.placeholder,Y=o.readOnly,w=o.editable,q=o.autoFocus,nn=o.basicSetup,en=nn===void 0?!0:nn,dn=o.highlightWhitespace,U=dn===void 0?!0:dn,tn=o.highlightActiveLine,g=tn===void 0?!0:tn,rn=o.onChange,R=rn===void 0?function(){}:rn,on=o.onWillMount,cn=on===void 0?function(f){}:on,_n=o.onMount,On=_n===void 0?function(f,x){}:_n,hn=o.onWillUnmount,kn=hn===void 0?function(f,x){}:hn,Dn=o.getWebAppTheme,In=Dn===void 0?Pn:Dn,pn=o.onWebAppThemeChange,En=pn===void 0?yn:pn,mn=(0,a.useRef)(null),X=(0,a.useRef)(null),s=(0,a.useRef)(null),d=(0,a.useCallback)(function(){return s.current},[]),an=(0,a.useCallback)(function(){return X.current},[]);(0,a.useImperativeHandle)(u,function(){return{getEditor:d,getState:an}},[d,an]);var sn=(0,a.useMemo)(function(){return{indentWithTab:ln,placeholder:G,readOnly:Y,editable:w,height:T,minHeight:S,maxHeight:A,width:y,minWidth:i,maxWidth:j,basicSetup:en,theme:I||(In()==="light"?"dark":"light"),onChange:R,extensions:C==null?void 0:C.extensions,language:W,highlightWhitespace:U,highlightActiveLine:g}},[en,w,T,ln,A,j,S,i,R,C==null?void 0:C.extensions,G,Y,I,y,In,W,U,g]),fn=(0,a.useRef)(sn);return(0,a.useEffect)(function(){fn.current=sn},[sn]),(0,a.useEffect)(function(){if(!(!mn||!mn.current)){var f=J(sn);return X.current=r.yy.create(c()(c()({},C),{},{doc:F||"",extensions:f})),cn(X.current),s.current=new t.tk({state:X.current,parent:mn.current}),On(s.current,X.current),function(){var x;kn(s.current,X.current),(x=s.current)===null||x===void 0||x.destroy()}}},[]),(0,a.useEffect)(function(){if(s.current){var f,x=J(c()(c()({},fn.current||{}),{},{language:W}));(f=s.current)===null||f===void 0||f.dispatch({effects:r.Py.reconfigure.of(x)})}},[W]),(0,a.useEffect)(function(){if(s!=null&&s.current){var f=s.current.state.doc.toString();F!==f&&s.current.dispatch({changes:{from:0,to:f.length,insert:F||""},annotations:[vn.of(!0)]})}},[F]),(0,a.useEffect)(function(){function f(Mn){var bn,Tn=I||(Mn==="light"?"dark":"light"),An=J(c()(c()({},fn.current||{}),{},{theme:Tn}));(bn=s.current)===null||bn===void 0||bn.dispatch({effects:r.Py.reconfigure.of(An)})}var x=En(f);return function(){return x&&x()}},[I,En]),(0,a.useEffect)(function(){if(s.current){var f=J(c()({},fn.current||{}));s.current.dispatch({effects:r.Py.reconfigure.of(f)})}},[T,S,A,y,i,j,G,w,Y,R]),(0,a.useEffect)(function(){q&&s.current&&s.current.focus()},[q]),(0,Cn.jsx)("div",{ref:mn,className:k()("".concat(M),E()(E()({},un,un),"".concat(M,"-theme-").concat(I),typeof I=="string"))})});Rn.displayName="MirrorEditor";var xn=Rn,m=xn}}]);
