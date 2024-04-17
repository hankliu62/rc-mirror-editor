import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { Annotation, EditorState, type Extension } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import type { ViewUpdate } from '@codemirror/view';
import { EditorView, highlightActiveLine, highlightWhitespace, keymap, placeholder } from '@codemirror/view';
import { basicSetup, type BasicSetupOptions } from '@uiw/codemirror-extensions-basic-setup';
import { langs, type LanguageName } from '@uiw/codemirror-extensions-langs';
import * as alls from '@uiw/codemirror-themes-all';

export { LanguageName, alls, langs };

export * from '@codemirror/theme-one-dark';

function processSize(size?: number | string): string {
  return size === undefined ? '' : typeof size === 'number' ? `${size}px` : size;
}

export interface DefaultExtensionsOptions {
  basicSetup?: boolean | BasicSetupOptions;
  theme?: 'light' | 'dark' | 'none' | Extension | keyof typeof alls;
  indentWithTab?: boolean;
  placeholder?: string | HTMLElement;
  readOnly?: boolean;
  editable?: boolean;
  highlightWhitespace?: boolean;
  highlightActiveLine?: boolean;
  height?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  onChange?: (value: string, event: ViewUpdate) => void;
  extensions?: Extension;
  language?: LanguageName;
}

export const External = Annotation.define<boolean>();

export const getDefaultExtensions = (
  options: DefaultExtensionsOptions = {
    language: 'html',
  },
): Extension[] => {
  const {
    indentWithTab: defaultIndentWithTab = true,
    editable = true,
    readOnly = false,
    theme = 'light',
    placeholder: placeholderStr = '',
    basicSetup: defaultBasicSetup = true,
    height = '100%',
    minHeight,
    maxHeight,
    width = '100%',
    minWidth,
    maxWidth,
    onChange,
    extensions: defaultExtensions,
    language,
    highlightWhitespace: highlightWhitespaceEnable,
    highlightActiveLine: highlightActiveLineEnable,
  } = options;

  // 更新事件
  const updateHandle = EditorView.updateListener.of((vu: ViewUpdate) => {
    if (
      vu.docChanged &&
      // Fix echoing of the remote changes:
      // If transaction is market as remote we don't have to call `onChange` handler again
      !vu.transactions.some(tr => tr.annotation(External))
    ) {
      const doc = vu.state.doc;
      const val = doc.toString();
      onChange(val, vu);
    }
  });

  // editor 外层样式
  const viewStyle: Record<string, string> = {
    height: processSize(height),
    minHeight: processSize(minHeight),
    maxHeight: processSize(maxHeight),
    width: processSize(width),
    minWidth: processSize(minWidth),
    maxWidth: processSize(maxWidth),
  };

  // 去除没有值的样式
  Object.keys(viewStyle).forEach(key => {
    if (!viewStyle[key]) {
      delete viewStyle[key];
    }
  });

  // 默认样式
  const defaultStyleOption = EditorView.theme({
    '&': viewStyle,
    '& .cm-scroller': {
      height: '100% !important',
    },
  });

  const extensions: Extension[] = [
    updateHandle,
    defaultStyleOption,
    ...(Array.isArray(defaultExtensions)
      ? defaultExtensions
      : defaultExtensions
      ? [defaultExtensions]
      : []),
  ];

  // 支持的语言
  if (langs[language]) {
    extensions.push(langs[language]());
  }

  const keyMaps = [...defaultKeymap];
  if (defaultIndentWithTab) {
    keyMaps.push(indentWithTab);
  }
  // 快捷键
  extensions.unshift(keymap.of(keyMaps));
  if (defaultBasicSetup) {
    if (typeof defaultBasicSetup === 'boolean') {
      // 基础设置
      extensions.unshift(basicSetup());
    } else {
      extensions.unshift(basicSetup(defaultBasicSetup));
    }
  }
  // 为空时的提示语
  if (placeholderStr) {
    extensions.unshift(placeholder(placeholderStr));
  }

  // 是否高亮空格
  if (highlightWhitespaceEnable) {
    extensions.unshift(highlightWhitespace())
  }

  // 是否高亮当前所在的行
  if (highlightActiveLineEnable) {
    extensions.unshift(highlightActiveLine())
  }

  // 主题
  switch (theme) {
    case 'light':
      extensions.push(alls.githubLight);
      break;
    case 'dark':
      extensions.push(oneDark);
      break;
    case 'none':
      break;
    default:
      extensions.push(
        ((typeof theme === 'string' ? alls[theme as keyof typeof alls] : theme) ||
          theme) as Extension,
      );
      break;
  }
  // 是否可编辑
  if (editable === false) {
    extensions.push(EditorView.editable.of(false));
  }
  // 是否只读
  if (readOnly) {
    extensions.push(EditorState.readOnly.of(true));
  }

  return extensions;
};
