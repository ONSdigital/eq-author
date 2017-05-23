import actionMatching from "tests/actionMatching";
import { META_UPDATE, updateMeta } from "actions/survey/meta";

describe("actions/survey/meta", () => {
  describe("updateMeta", () => {
    it("should pass 'key' and 'value' payload", () => {
      const payload = { key: "foo", value: "bar" };
      const result = updateMeta(payload.key, payload.value);
      expect(result).toEqual(actionMatching(META_UPDATE, payload));
    });
  });
});
