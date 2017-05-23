import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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

const DesignSurveyPage = ({
  selected,
  selectedSection,
  onChange,
  clearSurvey,
  deleteItem,
  surveyItems
}) => {
  return (
    <EditLayout>

      <ActionBar>
        <ActionButton tertiary small onClick={clearSurvey}>
          Delete All
        </ActionButton>
      </ActionBar>

      {selected &&
        <EditSurface>
          <Preview>
            <HTMLPreview
              surveyItems={surveyItems}
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

DesignSurveyPage.propTypes = {
  selected: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    item: PropTypes.oneOfType([section, question, answer])
  }),
  selectedSection: PropTypes.shape(CustomPropTypes.section),
  onChange: PropTypes.func.isRequired,
  clearSurvey: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  surveyItems: PropTypes.shape(CustomPropTypes.survey.items)
};

export default DesignSurveyPage;
