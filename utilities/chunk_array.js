function chunkArray(myArray, chunkSize) {
  let index = 0;
  const arrayLength = myArray.length;
  let tempArray = [];

  for (index = 0; index < arrayLength; index += chunkSize) {
    let chunk = myArray.slice(index, index + chunkSize);
    tempArray.push(chunk);
  }

  return tempArray;
}

export default chunkArray;
