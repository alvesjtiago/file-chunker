import { FileSize, Units } from '../../classes/file_size.js';
import test from 'tape';

test('should have a default value of 1 MB', function (t) {
  let size = new FileSize();
  t.equal(1, size.value);
  t.equal(Units.MB, size.unit);
  t.end();
});

test('should return number of bytes according to unit and value', function (t) {
  let size = new FileSize(2, Units.KB);
  t.equal(2000, size.bytes());
  t.end();
});
