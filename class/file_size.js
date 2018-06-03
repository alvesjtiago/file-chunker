'use strict';

class FileSize {
  constructor(value = 1, unit = 'MB') {
    this.value = value;
    // unit options: B / KB / MB / GB
    this.unit = unit;
  }

  bytes() {
    let multiplier = 1000000.0 // default to MB
    switch (this.unit) {
      case 'B':
        multiplier = 1.0
        break;
      case 'KM':
        multiplier = 100.0
        break;
      case 'MB':
        multiplier = 1000000.0
        break;
      case 'GB':
        multiplier = 1000000000.0
        break;
      default:
        multiplier = 1000000.0
    }

    return this.value * multiplier;
  }
}

module.exports = FileSize;