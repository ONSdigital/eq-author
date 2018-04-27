import React, { Component } from "react";
import PropTypes from "prop-types";
import { isNil } from "lodash";
import CustomPropTypes from "custom-prop-types";
import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import MainCanvas from "components/MainCanvas";
import ScrollPane from "components/ScrollPane";
import EditorSurface from "components/EditorSurface";
import NavigationSidebarContainer from "containers/NavigationSidebarContainer";
import getTextFromHTML from "utils/getTextFromHTML";
import ConnectedPropertiesPanel from "components/PropertiesPanel";
import Tabs from "components/Tabs";
import styled from "styled-components";
import Button from "components/Button";
import AddPage from "./icon-add-page.svg?inline";
import IconText from "components/IconText";
import SavingIndicator from "components/SavingIndicator";

const Centered = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4em;
`;

const Margin = styled.div`
  margin-top: 2em;
`;

class QuestionnaireDesignPage extends Component {
  static propTypes = {
    onUpdateSection: PropTypes.func.isRequired,
    onAddPage: PropTypes.func.isRequired,
    onUpdatePage: PropTypes.func.isRequired,
    onDeletePage: PropTypes.func.isRequired,
    onDeleteSection: PropTypes.func.isRequired,
    questionnaire: CustomPropTypes.questionnaire,
    section: CustomPropTypes.section,
    questionnaireId: PropTypes.string.isRequired,
    pageId: PropTypes.string,
    sectionId: PropTypes.string.isRequired,
    page: CustomPropTypes.page,
    breadcrumb: CustomPropTypes.breadcrumb,
    loading: PropTypes.bool.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return !isNil(nextProps.section) || !isNil(nextProps.page);
  }

  getMetaTitle = () => {
    const { questionnaire, page, section } = this.props;
    const pageTitle = getTextFromHTML(page ? page.title : section.title);

    return pageTitle
      ? `${pageTitle} - ${questionnaire.title}`
      : `${questionnaire.title}`;
  };

  handleAddPageClick = e => {
    const { onAddPage, section, page } = this.props;
    onAddPage(section.id, page ? page.position + 1 : 0);
  };

  handleDeletePage = () => {
    const { onDeletePage, section, page } = this.props;
    return onDeletePage(section.id, page.id);
  };

  handleDeleteSection = () => {
    const { onDeleteSection, section } = this.props;
    return onDeleteSection(section.id);
  };

  render() {
    const {
      breadcrumb,
      loading,
      questionnaire,
      section,
      page,
      questionnaireId,
      pageId,
      onUpdatePage,
      onUpdateSection
    } = this.props;

    if (loading) {
      return null;
    }

    return (
      <BaseLayout
        breadcrumb={breadcrumb}
        questionnaire={questionnaire}
        docTitle={this.getMetaTitle()}
      >
        <Grid align="top">
          <Column cols={2} gutters={false}>
            <NavigationSidebarContainer
              questionnaire={questionnaire}
              questionnaireId={questionnaireId}
              section={section}
              page={page}
              currentPageId={pageId}
            />
          </Column>
          <Column gutters={false}>
            <ScrollPane permanentScrollBar>
              <Margin>
                <MainCanvas>
                  <SavingIndicator />
                  <Tabs
                    questionnaire={questionnaire}
                    section={section}
                    page={page}
                  >
                    <EditorSurface
                      questionnaire={questionnaire}
                      section={section}
                      page={page}
                      onUpdatePage={onUpdatePage}
                      onDeletePage={this.handleDeletePage}
                      onUpdateSection={onUpdateSection}
                      onDeleteSection={this.handleDeleteSection}
                    />
                  </Tabs>
                </MainCanvas>
              </Margin>
              <Centered>
                <Button
                  variant="tertiary"
                  small
                  onClick={this.handleAddPageClick}
                  data-test="btn-add-page-2"
                >
                  <IconText icon={AddPage}>Add question page</IconText>
                </Button>
              </Centered>
            </ScrollPane>
          </Column>
          <Column cols={2} gutters={false}>
            <ConnectedPropertiesPanel
              questionnaire={questionnaire}
              page={page}
            />
          </Column>
        </Grid>
      </BaseLayout>
    );
  }
}

export default QuestionnaireDesignPage;
