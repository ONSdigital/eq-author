import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CustomPropTypes from "proptypes";
import ActionBar from "components/ActionBar";
import Button from "components/Button";
import OptionsPanel from "components/OptionsPanel";
import HTMLPreview from "components/HTMLPreview";

const EditLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ActionButton = styled(Button)`
  margin: 0.5em;
`;

const EditSurface = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-flow: column nowrap;
`;

const Preview = styled.div`
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: scroll;
`;

const Options = styled.form`
  position: relative;
`;

const DesignQuestionnairePage = ({
  selected,
  selectedSection,
  onChange,
  clearQuestionnaire,
  deleteItem,
  questionnaireItems
}) => {
  return (
    <EditLayout>

      <ActionBar>
        <ActionButton tertiary small onClick={clearQuestionnaire}>
          Delete All
        </ActionButton>
      </ActionBar>

      {selected &&
        <EditSurface>
          <Preview>
            <HTMLPreview
              questionnaireItems={questionnaireItems}
              selectedSection={selectedSection}
            />
          </Preview>

          <Options onChange={onChange}>
            <OptionsPanel selected={selected} deleteItem={deleteItem} />
          </Options>
        </EditSurface>}

    </EditLayout>
  );
};

const { section, question, answer } = CustomPropTypes;

DesignQuestionnairePage.propTypes = {
  selected: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    item: PropTypes.oneOfType([section, question, answer])
  }),
  selectedSection: CustomPropTypes.section,
  onChange: PropTypes.func.isRequired,
  clearQuestionnaire: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  questionnaireItems: CustomPropTypes.questionnaire.items
};

export default DesignQuestionnairePage;
