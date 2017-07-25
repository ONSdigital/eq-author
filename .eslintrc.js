const schema = require("eq-author-graphql-schema");

module.exports = {
  extends: ["eslint-config-eq-author", "eslint-config-eq-author/react"],
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src"]
      }
    }
  },
  rules: {
    "graphql/template-strings": [
      "error",
      {
        env: "apollo",
        schemaString: schema
      }
    ]
  },
  plugins: ["graphql"]
};
