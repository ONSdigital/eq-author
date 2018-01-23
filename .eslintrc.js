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
    "react/prop-types": 0,
    "graphql/template-strings": [
      "error",
      {
        env: "literal",
        schemaString: schema
      }
    ]
  },
  plugins: ["graphql"]
};
