import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import { Option, ItemSelect } from "./ItemSelect";
import withChangeHandler from "components/Forms/withChangeHandler";
import ScrollPane from "../ScrollPane";
import MovePageModal from ".";
import CustomPropTypes from "custom-prop-types";
import { times } from "lodash";

const Wrapper = styled.div`
  margin: 1em;
  border: 1px solid #999;
  width: 18em;
`;

const Select = styled(withChangeHandler(ItemSelect))`
  height: 200px;
`;

class ItemSelectStory extends React.Component {
  state = {
    value: "1"
  };

  handleChange = ({ value }) => {
    this.setState({ value });
  };

  render() {
    return (
      <Wrapper>
        <ScrollPane>
          <Select
            title="Position"
            onChange={this.handleChange}
            value={this.state.value}
            name="foo"
          >
            {times(10, i => (
              <Option value={String(i)} key={i}>
                {i}. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </Option>
            ))}
          </Select>
        </ScrollPane>
      </Wrapper>
    );
  }
}

const toLetter = charCode => String.fromCharCode(charCode + 65);

const buildPages = (sectionNumber, count) =>
  times(count, i => ({
    id: `${i + 1}`,
    title: `Page ${toLetter(sectionNumber)}${toLetter(i)}`,
    position: i
  }));

const buildSections = count =>
  times(count, i => ({
    id: `${i + 1}`,
    title: `Section ${toLetter(i)}`,
    pages: buildPages(i, 10)
  }));

const buildQuestionnaire = () => ({
  id: "1",
  sections: buildSections(10)
});

class MovePageStory extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire
  };
  state = {
    isModalOpen: true
  };

  handleToggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    const { questionnaire } = this.props;

    return (
      <div>
        <button type="button" onClick={this.handleToggleModal}>
          move page
        </button>
        <MovePageModal
          isOpen={this.state.isModalOpen}
          onClose={this.handleToggleModal}
          questionnaire={questionnaire}
          section={questionnaire.sections[0]}
          page={questionnaire.sections[0].pages[0]}
          onMovePage={action("movePage")}
        />
      </div>
    );
  }
}

storiesOf("MovePageModal", module)
  .add("ItemList", () => <ItemSelectStory />)
  .add("Modal", () => <MovePageStory questionnaire={buildQuestionnaire()} />);
