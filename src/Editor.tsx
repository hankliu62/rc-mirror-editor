import type { EditorStateConfig, Extension } from '@codemirror/state';
import { EditorState, StateEffect } from '@codemirror/state';
import type { ViewUpdate } from '@codemirror/view';
import { EditorView } from '@codemirror/view';
import { type BasicSetupOptions } from '@uiw/codemirror-extensions-basic-setup';
import classNames from 'classnames';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import type { DefaultExtensionsOptions, LanguageName, alls } from './getDefaultExtensions';
import { External, getDefaultExtensions } from './getDefaultExtensions';
import { getTheme, onDidChangeTheme } from './utils/themes';

export * from '@codemirror/state';
export * from '@codemirror/view';

export * from '@uiw/codemirror-extensions-basic-setup';
export * from '@uiw/codemirror-extensions-langs';
export * from '@uiw/codemirror-themes-all';
export * from './getDefaultExtensions';

export type TMirrorEditorTheme = 'light' | 'dark' | 'none' | Extension | keyof typeof alls;

export interface IMirrorEditorProps {
  height?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  prefixCls?: string;
  value?: string;
  className?: string;
  language?: LanguageName;
  theme?: 'light' | 'dark' | 'none' | Extension | keyof typeof alls;
  options?: EditorStateConfig;
  indentWithTab?: boolean;
  placeholder?: string | HTMLElement;
  readOnly?: boolean;
  editable?: boolean;
  autoFocus?: boolean;
  highlightWhitespace?: boolean;
  highlightActiveLine?: boolean;
  basicSetup?: boolean | BasicSetupOptions;
  onChange?: (value: string, event: ViewUpdate) => void;
  onWillMount?: (state: EditorState) => void;
  onMount?: (editor: EditorView, state: EditorState) => void;
  onWillUnmount?: (editor: EditorView, state: EditorState) => void;
  getWebAppTheme?: typeof getTheme;
  onWebAppThemeChange?: typeof onDidChangeTheme;
}

export interface IMirrorEditorImperativeHandles {
  getEditor: () => EditorView | null;
  getState: () => EditorState | null;
}

const MirrorEditor = forwardRef<IMirrorEditorImperativeHandles, IMirrorEditorProps>(
  (
    {
      theme,
      prefixCls = 'hlui-mirror-editor',
      height = '100%',
      minHeight,
      maxHeight,
      width = '100%',
      minWidth,
      maxWidth,
      value = '',
      className,
      language = 'html',
      options = {},
      indentWithTab,
      placeholder,
      readOnly,
      editable,
      autoFocus,
      basicSetup = true,
      highlightWhitespace = true,
      highlightActiveLine = true,
      onChange = () => {},
      onWillMount = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _state: EditorState,
      ) => {},
      onMount = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _editor: EditorView,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _state: EditorState,
      ) => {},
      onWillUnmount = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _editor: EditorView,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _state: EditorState,
      ) => {},
      getWebAppTheme = getTheme,
      onWebAppThemeChange = onDidChangeTheme,
    }: IMirrorEditorProps,
    ref,
  ) => {
    const editorContainer = useRef<HTMLDivElement | null>(null);
    const state = useRef<EditorState | null>(null);
    const editor = useRef<EditorView | null>(null);
    // 获取 EditorView
    const getEditor = useCallback(() => {
      return editor.current;
    }, []);

    // 获取 EditorView
    const getState = useCallback(() => {
      return state.current;
    }, []);

    /**
     * 导出方法
     */
    useImperativeHandle(
      ref,
      () => ({
        getEditor,
        getState,
      }),
      [getEditor, getState],
    );

    // 生成扩展的参数
    const extensionOptions = useMemo(
      () => ({
        indentWithTab,
        placeholder,
        readOnly,
        editable,
        height,
        minHeight,
        maxHeight,
        width,
        minWidth,
        maxWidth,
        basicSetup,
        theme: theme ? theme : getWebAppTheme() === 'light' ? 'dark' : 'light',
        onChange,
        extensions: options?.extensions,
        language,
        highlightWhitespace,
        highlightActiveLine,
      }),
      [
        basicSetup,
        editable,
        height,
        indentWithTab,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        onChange,
        options?.extensions,
        placeholder,
        readOnly,
        theme,
        width,
        getWebAppTheme,
        language,
        highlightWhitespace,
        highlightActiveLine,
      ],
    );

    const extensionOptionsRef = useRef<DefaultExtensionsOptions>(extensionOptions);

    useEffect(() => {
      extensionOptionsRef.current = extensionOptions;
    }, [extensionOptions]);

    useEffect(() => {
      if (!editorContainer || !editorContainer.current) {
        return;
      }

      // 扩展
      const extensions = getDefaultExtensions(extensionOptions);

      // 初始状态
      state.current = EditorState.create({
        ...options,
        doc: value || '',
        extensions,
      });

      onWillMount(state.current);

      editor.current = new EditorView({
        state: state.current,
        parent: editorContainer.current,
      });

      onMount(editor.current, state.current);
      return () => {
        // 注销之前执行生命周期函数
        onWillUnmount(editor.current, state.current);
        editor.current?.destroy();
      };
    }, []);

    useEffect(() => {
      if (editor.current) {
        const extensions = getDefaultExtensions({
          ...(extensionOptionsRef.current || {}),
          language,
        });
        editor.current?.dispatch({
          effects: StateEffect.reconfigure.of(extensions),
        });
      }
    }, [language]);

    useEffect(() => {
      if (editor?.current) {
        const currentValue = editor.current.state.doc.toString();
        if (value !== currentValue) {
          editor.current.dispatch({
            changes: { from: 0, to: currentValue.length, insert: value || '' },
            annotations: [External.of(true)],
          });
        }
      }
    }, [value]);

    useEffect(() => {
      function handleThemeChange(outTheme) {
        const currentTheme = theme || (outTheme === 'light' ? 'dark' : 'light');
        const extensions = getDefaultExtensions({
          ...(extensionOptionsRef.current || {}),
          theme: currentTheme,
        });
        editor.current?.dispatch({
          effects: StateEffect.reconfigure.of(extensions),
        });
      }
      const dispose = onWebAppThemeChange(handleThemeChange);
      return () => dispose && dispose();
    }, [theme, onWebAppThemeChange]);

    useEffect(() => {
      if (editor.current) {
        const extensions = getDefaultExtensions({ ...(extensionOptionsRef.current || {}) });
        editor.current.dispatch({ effects: StateEffect.reconfigure.of(extensions) });
      }
    }, [
      height,
      minHeight,
      maxHeight,
      width,
      minWidth,
      maxWidth,
      placeholder,
      editable,
      readOnly,
      onChange,
    ]);

    // 自动focus
    useEffect(() => {
      if (autoFocus && editor.current) {
        editor.current.focus();
      }
    }, [autoFocus]);

    // useEffect(() => {
    //   const observer = new ResizeObserver(() => {
    //     window.setTimeout(() => editor.current!.layout(), 0);
    //   });

    //   observer.observe(editorContainer.current!);
    //   return () => {
    //     observer.disconnect();
    //   };
    // }, []);

    return (
      <div
        ref={editorContainer}
        className={classNames(`${prefixCls}`, {
          [className]: className,
          [`${prefixCls}-theme-${theme}`]: typeof theme === 'string',
        })}
      />
    );
  },
);

MirrorEditor.displayName = 'MirrorEditor';

export default MirrorEditor;
