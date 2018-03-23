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
import Nav from "components/Nav";
import styled from "styled-components";
import IconButton from "components/IconButton";
import AddPage from "./icon-add-page.svg?inline";

const Centered = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4em;
`;

export class QuestionnaireDesignPage extends Component {
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
    this.props.onAddPage(this.props.section.id);
  };

  render() {
    const {
      breadcrumb,
      loading,
      questionnaire,
      section,
      page,
      questionnaireId,
      sectionId,
      pageId,
      onUpdatePage,
      onDeletePage,
      onUpdateSection,
      onDeleteSection
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
              sectionId={sectionId}
              pageId={pageId}
            />
          </Column>
          <Column gutters={false}>
            <ScrollPane>
              <MainCanvas>
                <Nav
                  questionnaire={questionnaire}
                  section={section}
                  page={page}
                />
                <EditorSurface
                  questionnaire={questionnaire}
                  section={section}
                  page={page}
                  onUpdatePage={onUpdatePage}
                  onDeletePage={onDeletePage}
                  onUpdateSection={onUpdateSection}
                  onDeleteSection={onDeleteSection}
                />
              </MainCanvas>
              <Centered>
                <IconButton
                  clear
                  onClick={this.handleAddPageClick}
                  icon={AddPage}
                >
                  Add question page
                </IconButton>
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
