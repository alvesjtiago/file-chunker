import { chunk, FileSize, Units } from '../';
import test from 'tape';

test("should return one file if it's less than chunk size", function (t) {
  var file = new File(["test"], "test.js")
  chunk(file, new FileSize(1, Units.MB))
    .then((files) => {
      t.equal(1, files.length);
      t.end();
    })
});

test("should return multiple files if it's larger than chunk size", function (t) {
  var sb = [];
  var c = 0;
  sb.push("<table>");
  for (var y = 0; y < 200; y++) {
      sb.push("<tr>");
      for (var x = 0; x < 1000; x++) {
          sb.push("<td>" + c++ + "</td>");
      }
      sb.push("</tr>");
  }
  sb.push("</table>");

  var file = new File(sb, {type: 'application/vnd.ms-excel'});

  var chunk_size = new FileSize(1, Units.MB).bytes()
  var chunks = Math.ceil(file.size / chunk_size)

  chunk(file, new FileSize(1, Units.MB))
    .then((files) => {
      t.equal(chunks, files.length);
      t.end();
    })
});