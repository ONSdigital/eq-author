import React from "react";
import { storiesOf } from "@storybook/react";
import RichTextEditor from "components/RichTextEditor";
import styled, { css } from "styled-components";
import { colors } from "constants/theme";
import { stateToHTML } from "draft-js-export-html";
import { action } from "@storybook/addon-actions";

const Wrapper = styled.div`
  margin: 1em;
  max-width: 30em;
`;

const focused = css`
  border-color: ${colors.lightBlue};
`;

const RTE = styled.div`
  padding: 1em;
  border-radius: 2px;
  border: 1px solid #eee;
  min-height: 10em;
  font-size: 0.9em;
  ${props => props.focus && focused};
`;

const content = {
  entityMap: {},
  blocks: [
    {
      key: "d300p",
      text: "List of styles:",
      type: "header-two",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "87jjn",
      text: "Regular",
      type: "unordered-list-item",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "4qi4u",
      text: "Bold",
      type: "unordered-list-item",
      depth: 0,
      inlineStyleRanges: [{ offset: 0, length: 4, style: "BOLD" }],
      entityRanges: [],
      data: {}
    },
    {
      key: "e23rk",
      text: "Emphasis",
      type: "unordered-list-item",
      depth: 0,
      inlineStyleRanges: [{ offset: 0, length: 8, style: "emphasis" }],
      entityRanges: [],
      data: {}
    }
  ]
};

const props = {
  onUpdate: action("onUpdate"),
  label: "Enter some text",
  placeholder: "Enter some text..."
};

storiesOf("RichTextEditor", module)
  .addDecorator(story =>
    <Wrapper>
      <RTE>
        {story()}
      </RTE>
    </Wrapper>
  )
  .add("Default", () => <RichTextEditor {...props} />)
  .add("No bold", () => <RichTextEditor {...props} bold={false} />)
  .add("With existing content", () =>
    <RichTextEditor content={JSON.stringify(content)} {...props} />
  );
