export enum VALID_RANGE {
    LAT_MIN = -90.000000000,
    LAT_MAX = 90.000000000,
    LONG_MIN = -180.000000000,
    LONG_MAX = 180.000000000,
  }

export enum FORMAT {
  DMS = 'DMS',
  DEC = 'DEC',
  DDM = 'DDM',
}

export const FORMAT_INPUT = /([^NnEeSsWw\s'\u00B0])\d+(\.\d+)*/g;

export const MATCH_BEHIND_DECIMAL = /[^\.]\d+(\.\d+)*/g;

export enum TYPE {
  LAT = "LAT",
  LONG = 'LONG',
}

// `dd mm ss.sss, dd mm ss.sss`
// `dd.dddddd, dd.dddddd`
// `ddd° mm.mmm', ddd° mm.mmm'`