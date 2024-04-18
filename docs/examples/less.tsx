import MirrorEditor from '@hankliu/rc-mirror-editor';
import * as React from 'react';

const LanguageDemo = `// variables
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
}`;

export default function Base() {
  const [content, setContent] = React.useState<string>(LanguageDemo);

  return (
    <div>
      <MirrorEditor
        height={400}
        value={content}
        language="less"
        onChange={val => {
          setContent(val);
        }}
        theme="atomone"
      />
    </div>
  );
}
