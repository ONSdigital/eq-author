import { saveState, loadState } from "./localStorage";

const KEY = "foo";
const STATE = { bar : true };

describe("loadState", () => {
  it("returns undefined if no item in storage", () => {
    expect(loadState(KEY)).toBe(undefined);
  });

  it("returns undefined if error parsing JSON", () => {
    localStorage.setItem(KEY, "=");
    expect(loadState(KEY)).toBe(undefined);
  });

  it("should parse JSON value in local storage", () => {
    localStorage.setItem(KEY, JSON.stringify(STATE));

    expect(loadState(KEY)).toEqual(STATE);
  });
});

describe("saveState", () => {
  it("stringifies state to given key", () => {
    saveState(KEY, STATE);
    expect(localStorage.getItem(KEY)).toEqual(JSON.stringify(STATE));
  });

  it("does nothing in event of an error", () => {
    // circular references break JSON.stringify
    const obj = {};
    obj.a = obj;

    saveState(KEY, obj);
    expect(localStorage.getItem(KEY)).toBeFalsy();
  });
});
