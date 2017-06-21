import React from "react";
import { MockedProvider } from "react-apollo/lib/test-utils";
import { mount } from "enzyme";
import { addTypenameToDocument } from "apollo-client";
import CreateQuestionnaireContainer, {
  getQuestionnaire,
  withData
} from "containers/createQuestionnaire";

const getQuery = addTypenameToDocument(getQuestionnaire);

const mockedData = {
  questionnaire: {
    id: 1,
    title: "My Questionnaire",
    description: "",
    navigation: false,
    legalBasis: "StatisticsOfTradeAct",
    theme: "default"
  }
};

const renderProvider = container => {
  const wrapper = mount(
    <MockedProvider
      mocks={[
        {
          request: { getQuery },
          result: { data: mockedData }
        }
      ]}
      store={{
        getState: () => {},
        dispatch: () => {},
        subscribe: () => {}
      }}
    >
      {container}
    </MockedProvider>
  );
  return wrapper;
};

describe("default export", () => {
  it("renders without crashing", () => {
    expect(renderProvider(<CreateQuestionnaireContainer />)).toMatchSnapshot();
  });
});
