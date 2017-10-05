import getTextFromHTML from "./getTextFromHTML";

describe("getTextFromHTML", () => {
  it("gets text from HTML", () => {
    const html = `<p>foo bar</p/>`;
    expect(getTextFromHTML(html)).toBe("foo bar");
  });

  it("returns empty string if html only have whitespace", () => {
    const html = `
      <p>     </p>

      <p></p>
    `;
    expect(getTextFromHTML(html)).toBe("");
  });

  it("preserves whitespace", () => {
    const html = `<p>foo bar</p/>
    
    <p>blah</p>`;
    expect(getTextFromHTML(html)).toBe(`foo bar
    
    blah`);
  });
});
