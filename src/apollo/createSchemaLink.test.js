import { SchemaLink } from "apollo-link-schema";
import createSchemaLink from "apollo/createSchemaLink";

describe("createSchemaLink", () => {
  it("should create an instance of SchemaLink", () => {
    expect(createSchemaLink()).toBeInstanceOf(SchemaLink);
  });
});
