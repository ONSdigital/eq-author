import sinon from "sinon";

export function stubConsoleError() {
  beforeEach(() => {
    sinon.stub(console, "error");
  });

  afterEach(() => {
    console.error.restore();  // eslint-disable-line  no-console
  });
}
