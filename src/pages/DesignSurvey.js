import React from 'react';
import styled from 'styled-components';
import ActionBar from 'components/ActionBar';
import Button from 'components/Button';
import OptionsPanel from 'components/OptionsPanel';
import {SidebarPageLayout} from 'layouts';

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
`;

const Options = styled.div`

`;

const DesignSurveyPage = ({selected}) => {
  return (
    <SidebarPageLayout>

      <EditLayout>

        <ActionBar>
          <ActionButton primary small>Save</ActionButton>
        </ActionBar>

        <EditSurface>

          {selected && [
            <Preview>
              {selected.title || selected.displayName}
            </Preview>,

            <Options>
              <OptionsPanel title={selected.title || selected.displayName} />
            </Options>,
          ]}

        </EditSurface>

      </EditLayout>

    </SidebarPageLayout>
  );
};

export default DesignSurveyPage;
