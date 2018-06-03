# file-chunker

Chunk files into smaller ones directly on the browser.

## Install

```bash
npm i file-chunker
```

## Usage

```javascript
const chunk = require('file-chunker');

var file = new File("example content", "test.js")
var chunkSize = 1 // Size in MB

chunk(file, chunkSize)
  .then((files) => {
    console.log(files.length)
  })
```