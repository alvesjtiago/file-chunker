import { FileSize, Units } from './classes/file_size.js';
import chunkArray from './utilities/chunk_array.js';
import createFile from './utilities/create_file.js';

const defaultChunkSizeInMb = 1;

let chunk = function (file, chunkSize) {
  if (!chunkSize) {
    chunkSize = new FileSize(1, Units.MB);
  }

  if (file.size <= chunkSize.bytes()) {
    return Promise.resolve([file]);
  } else {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = function () {
        let arrayBuffer = this.result,
          array = new Uint8Array(arrayBuffer);

        const arrayOfFilesBytes = chunkArray(array, chunkSize.bytes());

        // Write file parts
        let promises = [];
        arrayOfFilesBytes.forEach(element =>
          promises.push(createFile(element)),
        );
        Promise.all(promises)
          .then(function (files) {
            resolve(files);
          })
          .catch(() => {
            reject();
          });
      };
      reader.readAsArrayBuffer(file);
    });
  }
};

export { chunk, FileSize, Units };
