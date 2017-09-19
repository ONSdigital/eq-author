import React from "react";
import { storiesOf } from "@storybook/react";
import RichTextEditor from "components/RichTextEditor";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import content from "./testContent";

const Wrapper = styled.div`
  margin: 4em 1em 0;
  max-width: 30em;
`;

const RTE = styled.div`
  padding: 1em;
  border-radius: 2px;
  border: 1px solid #f4ecec;
  min-height: 3em;
  font-size: 0.9em;
`;

const Title = styled.div`
  font-size: 1.6em;
  font-weight: 700;
`;

const props = {
  onUpdate: action("onUpdate"),
  label: "Enter some text",
  placeholder: "Enter some text..."
};

storiesOf("RichTextEditor", module)
  .addDecorator(story => (
    <Wrapper>
      <RTE>{story()}</RTE>
    </Wrapper>
  ))
  .add("Default", () => <RichTextEditor {...props} />)
  .add("With existing value", () => (
    <RichTextEditor value={content} {...props} />
  ))
  .add("Title field", () => (
    <Title>
      <RichTextEditor {...props} bold={false} list={false} heading={false} />
    </Title>
  ));
