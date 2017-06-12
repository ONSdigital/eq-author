import actionMatching from "tests/utils/actionMatching";
import { META_UPDATE, updateMeta } from "actions/questionnaire/meta";

describe("actions/questionnaire/meta", () => {
  describe("updateMeta", () => {
    it("should pass 'key' and 'value' payload", () => {
      const payload = { key: "foo", value: "bar" };
      const result = updateMeta(payload.key, payload.value);
      expect(result).toEqual(actionMatching(META_UPDATE, payload));
    });
  });
});
