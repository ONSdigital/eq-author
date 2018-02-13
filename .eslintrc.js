const path = require("path");
const schema = require("eq-author-graphql-schema");

const config = {
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, "node_modules")
    ]
  }
};

module.exports = {
  extends: ["eslint-config-eq-author", "eslint-config-eq-author/react"],
  settings: {
    "import/resolver": {
      webpack: {
        config
      }
    }
  },
  rules: {
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
