"use strict";

import FileSize from './class/file_size.js';

const defaultChunkSizeInMb = 1

let chunk = function(file, chunkSize) {
  if (!chunkSize) {
    chunkSize = new FileSize(1, 'MB')
  }

  if (file.size <= chunkSize.bytes()) {
    return Promise.resolve([file])
  } else {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = function() {

        let arrayBuffer = this.result,
            array       = new Uint8Array(arrayBuffer);

        const arrayOfFilesBytes = chunkArray(array, chunkSize.bytes())

        // Write file parts
        let promises = []
        arrayOfFilesBytes.forEach(element => promises.push(createFile(element)))
        Promise.all(promises)
          .then(function(files) {
            resolve(files)
          })
          .catch(() => {
            reject()
          })
      }
      reader.readAsArrayBuffer(file);
    })
  }
}

function createFile(arrayBuffer) {
  const file = new File([arrayBuffer], "file")
  return Promise.resolve(file)
}

function chunkArray(myArray, chunkSize){
  let index = 0;
  const arrayLength = myArray.length;
  let tempArray = [];
  
  for (index = 0; index < arrayLength; index += chunkSize) {
      let chunk = myArray.slice(index, index+chunkSize);
      tempArray.push(chunk);
  }

  return tempArray;
}

exports = module.exports = {
  chunk: chunk,
  FileSize: FileSize
}
