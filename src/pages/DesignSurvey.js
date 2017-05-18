import React from "react";
import styled from "styled-components";
import ActionBar from "components/ActionBar";
import Button from "components/Button";
import OptionsPanel from "components/OptionsPanel";
import HTMLPreview from "components/HTMLPreview";
import { SidebarPageLayout } from "layouts";

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
  deleteSurvey,
  deleteItem,
  type,
  surveyItems
}) => {
  return (
    <SidebarPageLayout>

      <EditLayout>

        <ActionBar>
          <ActionButton tertiary small onClick={deleteSurvey}>
            Delete All
          </ActionButton>
        </ActionBar>

        {selected &&
          <EditSurface>
            <Preview>
              <HTMLPreview
                selected={selected}
                survey={surveyItems}
                selectedSection={selectedSection}
              />
            </Preview>

            <Options onChange={onChange}>
              <OptionsPanel
                selected={selected}
                type={type}
                deleteItem={deleteItem}
              />
            </Options>

          </EditSurface>}

      </EditLayout>

    </SidebarPageLayout>
  );
};

export default DesignSurveyPage;
