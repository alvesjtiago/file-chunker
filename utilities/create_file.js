function createFile(arrayBuffer) {
  const file = new File([arrayBuffer], "file")
  return Promise.resolve(file)
}

exports = module.exports = createFile