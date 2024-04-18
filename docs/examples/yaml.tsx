import MirrorEditor from '@hankliu/rc-mirror-editor';
import * as React from 'react';

const LanguageDemo = `name: CI

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
        run: npm test`;

export default function Base() {
  const [content, setContent] = React.useState<string>(LanguageDemo);

  return (
    <div>
      <MirrorEditor
        height={400}
        value={content}
        language="yaml"
        onChange={val => {
          setContent(val);
        }}
        theme="githubLight"
      />
    </div>
  );
}
