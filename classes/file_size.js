export const Units = Object.freeze({
  B: Symbol('B'),
  KB: Symbol('KB'),
  MB: Symbol('MB'),
  GB: Symbol('GB'),
});

const Multipliers = {
  [Units.B]: 1.0,
  [Units.KB]: 1000.0,
  [Units.MB]: 1000000.0,
  [Units.GB]: 1000000000.0,
};

export class FileSize {
  // unit options: B / KB / MB / GB
  constructor(value = 1, unit = Units.MB) {
    this.value = value;
    this.unit = unit;
  }

  bytes() {
    return (
      this.value *
      // eslint-disable-next-line no-prototype-builtins
      (Multipliers.hasOwnProperty(this.unit)
        ? Multipliers[this.unit]
        : Multipliers[Units.MB])
    );
  }
}
