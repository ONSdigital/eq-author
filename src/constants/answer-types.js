export const CHECKBOX = "Checkbox";
export const RADIO = "Radio";
export const TEXTFIELD = "TextField";
export const TEXTAREA = "TextArea";
export const CURRENCY = "Currency";
export const NUMBER = "Number";
export const TIME = "Time";
export const DATE = "Date";
export const DATE_RANGE = "DateRange";

export const LENGTH = "Length";
export const AREA = "Area";
export const VOLUME = "Volume";

export const units = {
  [NUMBER]: {
    name: NUMBER,
    types: {
      number: "Number"
    }
  },
  [LENGTH]: {
    name: LENGTH,
    types: {
      cm: "(cm) Centimetres",
      m: "(m) Metres",
      km: "(km) Kilometres",
      mi: "(mi) Miles"
    }
  },
  [AREA]: {
    name: AREA,
    types: {
      cm2: "(cm&sup2;) Square centimetres",
      m2: "(m&sup2;) Square metres",
      km2: "(m&sup2;) Square kilometres",
      mi2: "(mi&sup2;) Square miles"
    }
  },
  [VOLUME]: {
    name: VOLUME,
    types: {
      cm3: "(cm&sup3;) Cubic centimetres",
      m3: "(m&sup3;) Cubic metres",
      km3: "(km&sup3;) Cubic kilometres"
    }
  }
};
