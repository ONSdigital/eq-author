import { IntrospectionFragmentMatcher } from "react-apollo";
export default new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "INTERFACE",
          name: "Answer",
          possibleTypes: [
            { name: "BasicAnswer" },
            { name: "MultipleChoiceAnswer" }
          ]
        }
      ]
    }
  }
});
