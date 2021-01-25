import chunkArray from '../../utilities/chunk_array.js';
import test from 'tape';

test('should chunk array into multiple arrays of chunk size', function (t) {
  let array = ['0', '1', '2', '3', '4'];
  let chunks = chunkArray(array, 2);
  t.equal(3, chunks.length);
  t.end();
});
