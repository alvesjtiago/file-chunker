# file-chunker [![Build Status](https://travis-ci.org/alvesjtiago/file-chunker.svg?branch=master)](https://travis-ci.org/alvesjtiago/file-chunker)

Chunk files into smaller ones directly on the browser.

## Install

```bash
npm i file-chunker
```

## Usage

```javascript
import { chunk, FileSize, Units } from 'file-chunker';

var file = new File("example content", "test.js")
var chunkSize = new FileSize(1, Units.MB)

chunk(file, chunkSize)
  .then((files) => {
    console.log(files.length)
  })
```