import { fireEvent, render, screen } from '@testing-library/react';
import React, { useEffect, useRef } from 'react';
import renderer from 'react-test-renderer';

import type { IMirrorEditorImperativeHandles } from '../src';
import MirrorEditor from '../src';

it('MirrorEditor', async () => {
  const component = renderer.create(<MirrorEditor />);
  const tree = component.toJSON();
  if (tree && !Array.isArray(tree)) {
    expect(tree.type).toEqual('div');
    expect(tree.props.className).toEqual('hlui-mirror-editor');
  }
});

it('MirrorEditor onChange', async () => {
  const handleChange = jest.fn(value => {
    expect(value).toEqual('# title');
    return Array.isArray(value) ? value.join() : value;
  });
  render(<MirrorEditor autoFocus value="console.log('Hello world!')" onChange={handleChange} />);
  const input = await screen.findByRole<HTMLInputElement>('textbox'); // findByRole('textbox');
  fireEvent.change(input, { target: { textContent: '# title' } });
  const elm = screen.queryByText('# title');
  expect((elm as any).cmView.dom.innerHTML).toEqual('# title');
});

it('MirrorEditor onChange', async () => {
  render(
    <MirrorEditor
      value="console.log('Hello world!')"
      autoFocus
      onChange={(_, viewUpdate) => {
        expect(viewUpdate.state.doc.length).toEqual(27);
      }}
    />,
  );
});

it('MirrorEditor ref', async () => {
  function Demo() {
    const ref = useRef<IMirrorEditorImperativeHandles>(null);
    useEffect(() => {
      expect(Object.keys(ref.current!)).toEqual(['getEditor', 'getState']);
    }, [ref]);

    return <MirrorEditor ref={ref} value="console.log('Hello world!')" />;
  }
  render(<Demo />);
});

it('MirrorEditor theme', async () => {
  const component = renderer.create(<MirrorEditor theme="dark" />);
  const tree = component.toJSON();
  if (tree && !Array.isArray(tree)) {
    expect(tree.type).toEqual('div');
    expect(tree.props.className).toEqual('hlui-mirror-editor hlui-mirror-editor-theme-dark');
  }
});

it('MirrorEditor className', async () => {
  const component = renderer.create(<MirrorEditor className="test" />);
  const tree = component.toJSON();
  if (tree && !Array.isArray(tree)) {
    expect(tree.type).toEqual('div');
    expect(tree.props.className).toEqual('hlui-mirror-editor test');
  }
});

it('MirrorEditor prefixCls', async () => {
  const component = renderer.create(<MirrorEditor prefixCls="hankliu-mirror-editor" />);
  const tree = component.toJSON();
  if (tree && !Array.isArray(tree)) {
    expect(tree.type).toEqual('div');
    expect(tree.props.className).toEqual('hankliu-mirror-editor');
  }
});

it('MirrorEditor placeholder', async () => {
  render(<MirrorEditor placeholder="Hello World" className="test" />);
  const elm = screen.queryByText('Hello World');
  expect(elm!.style.pointerEvents).toEqual('none');
  expect(elm!.className).toEqual('cm-placeholder');
});

it('MirrorEditor editable', async () => {
  render(<MirrorEditor editable={false} className="test" />);
  const text = screen.getByRole('textbox');
  expect(text.className).toEqual('cm-content');
  expect(text.tagName).toEqual('DIV');
});

it("MirrorEditor doesn't echo changes", async () => {
  const handleChange = jest.fn();
  const { rerender } = render(<MirrorEditor value="value a" onChange={handleChange} />);
  rerender(<MirrorEditor value="value b" onChange={handleChange} />);
  expect(handleChange).not.toHaveBeenCalled();
});
