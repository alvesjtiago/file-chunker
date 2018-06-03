"use strict";

(function() {
  const defaultChunkSizeInMb = 1

  var chunk = function(file, chunkSize) {
    if (!chunkSize) {
      chunkSize = defaultChunkSizeInMb
    }

    const sizeInMb = file.size / 1000000.0

    if (sizeInMb <= chunkSize) {
      return Promise.resolve([file])
    } else {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function() {

          var arrayBuffer = this.result,
              array       = new Uint8Array(arrayBuffer);

          const arrayOfFilesBytes = chunkArray(array, chunkSize * 1000000)

          // Write file parts
          var promises = []
          arrayOfFilesBytes.forEach(function(element) {
            promises.push(createFile(element))
          });
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
    var file = new File([arrayBuffer], "file")
    return Promise.resolve(file)
  }

  function chunkArray(myArray, chunkSize){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunkSize) {
        var chunk = myArray.slice(index, index+chunkSize);
        tempArray.push(chunk);
    }

    return tempArray;
  }

  chunk.noConflict = function() {
    root.chunk = previous_chunk
    return chunk
  }

  var root = this
  var previous_chunk = root.chunk

  if( typeof exports !== 'undefined' ) {
    if( typeof module !== 'undefined' && module.exports ) {
      exports = module.exports = chunk
    }
    exports.chunk = chunk
  } 
  else {
    root.chunk = chunk
  }

}).call(this);
