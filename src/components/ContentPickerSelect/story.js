import React from "react";
import styled from "styled-components";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { UnwrappedContentPickerSelect } from "components/ContentPickerSelect";

const Wrapper = styled.div`
  position: absolute;
  padding: 2em;
  width: 25em;
`;

const Decorator = storyFn => <Wrapper>{storyFn()}</Wrapper>;

const props = {
  match: {
    params: {
      questionnaireId: "1"
    }
  },
  data: {
    questionnaire: {
      id: "1"
    }
  },
  onSubmit: action("submit")
};

storiesOf("ContentPickerSelect", module)
  .addDecorator(Decorator)
  .add("No content selected", () => <UnwrappedContentPickerSelect {...props} />)
  .add("Content selected", () => (
    <UnwrappedContentPickerSelect
      {...props}
      selectedContentDisplayName="I am an answer"
    />
  ))
  .add("Content truncated", () => (
    <UnwrappedContentPickerSelect
      {...props}
      selectedContentDisplayName="I am a really really really long answer"
    />
  ));
