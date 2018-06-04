import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import styled from "styled-components";
import Tabs from "components/Tabs";
import Button from "components/Button";
import IconText from "components/IconText";
import MainCanvas from "components/MainCanvas";
import ScrollPane from "components/ScrollPane";
import PropertiesPanel from "components/PropertiesPanel";
import AddPage from "components/QuestionnaireDesignPage/icon-add-page.svg?inline";
import SavingIndicator from "components/SavingIndicator";
import { Grid, Column } from "components/Grid";

const Centered = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4em;
`;

const Margin = styled.div`
  margin-top: 2em;
`;

const EditorLayout = ({ children, onAddPage, page, ...otherProps }) => (
  <Grid {...otherProps}>
    <Column gutters={false}>
      <ScrollPane permanentScrollBar>
        <Margin>
          <MainCanvas>
            <SavingIndicator />
            <Tabs>{children}</Tabs>
          </MainCanvas>
        </Margin>
        <Centered>
          <Button
            variant="tertiary"
            small
            onClick={onAddPage}
            data-test="btn-add-page-2"
          >
            <IconText icon={AddPage}>Add question page</IconText>
          </Button>
        </Centered>
      </ScrollPane>
    </Column>
    <Column cols={2} gutters={false}>
      <PropertiesPanel page={page} />
    </Column>
  </Grid>
);

EditorLayout.propTypes = {
  children: PropTypes.node.isRequired,
  onAddPage: PropTypes.func.isRequired,
  page: CustomPropTypes.page
};

export default EditorLayout;
