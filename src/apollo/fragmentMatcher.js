import { IntrospectionFragmentMatcher } from "react-apollo";
export default new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "OBJECT",
          name: "Query",
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "Questionnaire",
          possibleTypes: null
        },
        {
          kind: "SCALAR",
          name: "Int",
          possibleTypes: null
        },
        {
          kind: "SCALAR",
          name: "String",
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "Theme",
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "LegalBasis",
          possibleTypes: null
        },
        {
          kind: "SCALAR",
          name: "Boolean",
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "Section",
          possibleTypes: null
        },
        {
          kind: "INTERFACE",
          name: "Page",
          possibleTypes: [
            {
              name: "QuestionPage"
            }
          ]
        },
        {
          kind: "ENUM",
          name: "PageType",
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "QuestionPage",
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "QuestionType",
          possibleTypes: null
        },
        {
          kind: "INTERFACE",
          name: "Answer",
          possibleTypes: [
            {
              name: "BasicAnswer"
            },
            {
              name: "MultipleChoiceAnswer"
            }
          ]
        },
        {
          kind: "ENUM",
          name: "AnswerType",
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "Option",
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "Mutation",
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "__Schema",
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "__Type",
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "__TypeKind",
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "__Field",
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "__InputValue",
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "__EnumValue",
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "__Directive",
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "__DirectiveLocation",
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "BasicAnswer",
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "MultipleChoiceAnswer",
          possibleTypes: null
        }
      ]
    }
  }
});
