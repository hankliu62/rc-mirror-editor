# @hankliu/rc-mirror-editor

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![build status][github-actions-image]][github-actions-url]
[![Codecov][codecov-image]][codecov-url]
[![bundle size][bundlephobia-image]][bundlephobia-url]
[![dumi][dumi-image]][dumi-url]

[npm-image]: http://img.shields.io/npm/v/rc-mirror-editor.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@hankliu/rc-mirror-editor
[travis-image]: https://img.shields.io/travis/hankliu62/rc-mirror-editor/master?style=flat-square
[github-actions-image]: https://github.com/hankliu62/rc-mirror-editor/workflows/CI/badge.svg
[github-actions-url]: https://github.com/hankliu62/rc-mirror-editor/actions
[codecov-image]: https://img.shields.io/codecov/c/github/hankliu62/rc-mirror-editor/master.svg?style=flat-square
[codecov-url]: https://app.codecov.io/gh/hankliu62/rc-mirror-editor
[download-image]: https://img.shields.io/npm/dm/@hankliu/rc-mirror-editor.svg?style=flat-square
[download-url]: https://npmjs.org/package/@hankliu/rc-mirror-editor
[bundlephobia-url]: https://bundlephobia.com/package/@hankliu/rc-mirror-editor
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/@hankliu/rc-mirror-editor
[dumi-url]: https://github.com/umijs/dumi
[dumi-image]: https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square

`Mirror Editor` 编辑器是功能齐全的代码编辑器，支持多种常规语言的IDE，允许配置支持智能提示。

## 特征

- [x] 支持常见语言
- [x] 支持多种主题

## 安装

``` bash
npm install @hankliu/rc-mirror-editor --save
```

or

``` bash
yarn add @hankliu/rc-mirror-editor
```

or

``` bash
pnpm install @hankliu/rc-mirror-editor
```

## 使用

``` tsx
import type { LanguageName, TMirrorEditorTheme} from '@hankliu/rc-mirror-editor';
import MirrorEditor, { alls, langs } from '@hankliu/rc-mirror-editor';
import { Button, Checkbox, Col, ConfigProvider, Divider, Input, Row, Select } from '@hankliu/hankliu-ui';
import zhCN from '@hankliu/hankliu-ui/lib/locale/zh_CN'
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
};

const themeOptions = ['dark', 'light']
  .concat(Object.keys(alls))
  .filter((item) => typeof alls[item as keyof typeof alls] !== 'function')
  .filter((item) => !/^(defaultSettings)/.test(item as keyof typeof alls));
const heightOptions = ['auto', '200px', '300px', '500px'];

export default function Base() {
  const [content, setContent] = React.useState<string>(LanguageDemo.html);
  const [language, setLanguage] = React.useState<LanguageName>("html");
  const [theme, setTheme] = React.useState<TMirrorEditorTheme>('dark');
  const [height, setHeight] = React.useState<string>('500px');
  const [placeholder, setPlaceholder] = React.useState<string>('请输入内容');
  const [autofocus, setAutofocus] = React.useState<boolean>(false);
  const [editable, setEditable] = React.useState<boolean>(true);

  const onDidChangeTheme = (callback: (theme: "dark" | "light") => void) => {
    const root = document.querySelector("html");

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "attributes") {
          if (root?.getAttribute("data-prefers-color") === "dark") {
            callback("dark");
          } else {
            callback("light");
          }
        }
      }
    });

    observer.observe(root, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }

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
        onChange={(val) => {
          setContent(val);
        }}
        getWebAppTheme={() => {
          return document.querySelector("html")?.getAttribute("data-prefers-color") === "dark"
            ? "dark"
            : "light";
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
                style={{ width: "100%" }}
                onChange={(val) => {
                  setContent(LanguageDemo[val] || '');
                  setLanguage(val);
                }}
                showSearch
              >
                {
                  Object.keys(langs).sort().map((item) => (
                    <Select.Option key={item} value={item}>{item}</Select.Option>
                  ))
                }
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
                style={{ width: "100%" }}
                onChange={(val) => {
                  setTheme(val);
                }}
                showSearch
              >
                {
                  themeOptions.map((item) => (
                    <Select.Option key={item} value={item}>{item}</Select.Option>
                  ))
                }
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
                style={{ width: "100%" }}
                onChange={(val) => {
                  setHeight(val);
                }}
                showSearch
              >
                {
                  heightOptions.map((item) => (
                    <Select.Option key={item} value={item}>{item}</Select.Option>
                  ))
                }
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
                style={{ width: "100" }}
                value={placeholder}
                onChange={(event) => { setPlaceholder(event.target.value) }}
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
                onChange={(event) => { setAutofocus(event.target.checked) }}
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
                onChange={(event) => { setEditable(event.target.checked) }}
              >
                可编辑
              </Checkbox>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={8}>
          <Button onClick={() => { setContent('') }}>清空内容</Button>
        </Col>
      </Row>
    </ConfigProvider>
  );
}
```

## API 参数

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| className | string | - | 组件外层元素classname |
| prefixCls | string | hlui-mirror-editor | 组件外层元素 classname 前缀 |
| width | string \| number | 100% | 编辑器的宽度。|
| minWidth | string \| number | auto | 编辑器的最小宽度。|
| maxWidth | string \| number | auto | 编辑器的最大宽度。|
| height | string \| number | 100% | 编辑器的高度 |
| minHeight | string \| number | auto | 编辑器的最小高度 |
| maxHeight | string \| number | auto | 编辑器的最大高度 |
| value | 编辑器中自动创建的模型的值 | string | - |
| language | string | html | 编辑器中自动创建的模型的初始语言 |
| theme | TMirrorEditorTheme | - | 编辑器的主题 |
| options | EditorStateConfig | 默认值在如下所示 | 请参阅 [EditorStateConfig](https://codemirror.net/docs/ref/#state.EditorStateConfig) |
| placeholder | string \| HTMLElement | - | 编辑器中占位符 |
| indentWithTab | boolean | true | 是否使用制表符缩进 |
| readOnly | boolean | false | 编辑器是否只读 |
| editable | boolean | true | 编辑器是否允许编辑 |
| autoFocus | boolean | true | 编辑器是否自动聚焦 |
| basicSetup | boolean \| BasicSetupOptions | true | 编辑器中是否进行初始化配置 |
| highlightWhitespace | boolean | true | 是否高亮空格 |
| highlightActiveLine | boolean | true | 是否高亮当前所在的行 |
| onChange | (newValue: string, event: ViewUpdate) => void | - | 当前编辑器模型的内容发生更改时发出的事件 |
| onWillMount | (state: EditorState) => void | - | 在编辑器挂载之前发出的事件（类似于 `componentWillMount React`） |
| onMount | (editor: EditorView, state: EditorState) => void | - | 挂载编辑器时发出的事件（类似于 `componentDidMount React`） |
| onWillUnmount | (editor: EditorView, state: EditorState) => void | - | 在编辑器卸载之前发出的事件（类似于 `componentWillUnmount React`） |
| getWebAppTheme | () => "dark" \| "light" | [getTheme]() | 获得当前Web应用的主题模式（亮色｜暗色），当不存在 `theme` 参数时根据当前函数的返回值设置编辑器的主题 |
| onWebAppThemeChange | (callback: (theme: "dark" \| "light") => void) => (() => void) \| void | [onDidChangeTheme]() | 当当前Web应用的主题模式（亮色｜暗色）发生改变时的监听函数，当不存在 `theme` 参数时根据当前监听函数的返回值动态设置编辑器的主题 |

## 案例

`npm start` 然后打开 http://localhost:8000/examples/

线上案例: https://hankliu62.github.io/rc-mirror-editor

## 单元测试

```
npm test
```

## 覆盖率

```
npm run coverage
```

## License

@hankliu/rc-mirror-editor is released under the MIT license.
