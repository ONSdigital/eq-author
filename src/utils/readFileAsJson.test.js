import readFileAsJson from "./readFileAsJson";

function createJsonFile(text = "true", name = "foo.json") {
  return new File(text.split(""), name);
}

it("returns a promise", () => {
  expect(readFileAsJson(createJsonFile("true"))).toBeInstanceOf(Promise);
});

it("requires File or Blob as argument", () => {
  expect(() => readFileAsJson({})).toThrow();
  expect(() => readFileAsJson(createJsonFile())).not.toThrow();
});

it("resovles valid JSON", () => {
  expect.assertions(1);

  const obj  = { "foo" : "bar" };
  const json = JSON.stringify(obj);

  return readFileAsJson(createJsonFile(json)).then(data => {
    expect(data).toEqual(obj);
  });
});

it("rejects invalid JSON", () => {
  expect.assertions(1);

  return readFileAsJson(createJsonFile("LOL")).catch(e => {
    expect(e).toBeInstanceOf(Error);
  })
});