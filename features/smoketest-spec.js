describe("eQ Author", () => {
  describe("navigate to the Homepage", () => {
    beforeEach(() => {
      browser.url("http://localhost:3000/");
    });

    it("displays page title", () => {
      expect(browser.getTitle()).toEqual("eQ Author Prototype");
    });

    it("displays option buttons", () => {
      expect(browser.getHTML("#root")).toContain("Select to begin");
    });
  });
});
