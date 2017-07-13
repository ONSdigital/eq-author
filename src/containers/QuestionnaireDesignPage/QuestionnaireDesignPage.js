import React, { Component } from "react";
import PropTypes from "prop-types";
import { merge, set, noop } from "lodash";
import { Link } from "react-router-dom";

import CustomPropTypes from "custom-prop-types";

import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import { PropertyPane, PropertyPaneTitle } from "components/PropertyPane";
import QuestionProperties from "components/QuestionProperties";
import QuestionnaireDesign from "components/QuestionnaireDesign";

export class QuestionnaireDesignPage extends Component {
  static propTypes = {
    breadcrumb: CustomPropTypes.breadcrumb,
    onAddPage: PropTypes.func.isRequired,
    onSectionUpdate: PropTypes.func.isRequired,
    onPageUpdate: PropTypes.func.isRequired,
    questionnaire: CustomPropTypes.questionnaire,
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    question: CustomPropTypes.question,
    loading: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    const { section, page } = props;

    this.state = {
      section,
      page,
      focused: "section"
    };
  }

  componentWillReceiveProps({ section, page }) {
    this.setState({ section, page });
  }

  handleChange = change => {
    this.setState(merge({}, this.state, set({}, change.name, change.value)));
  };

  handleAnswerAdd = () => {
    alert("add an answer to this parent");
  };

  handleBlur = canvasSectionName => {
    this.setFocused(canvasSectionName);

    switch (this.state.focused) {
      case "section":
        this.props.onSectionUpdate(this.state.section);
        break;
      case "page":
        this.props.onPageUpdate(this.state.page);
        break;
      default:
        break;
    }
  };

  handleFocus = canvasSectionName => {
    this.setFocused(canvasSectionName);
  };

  handleAddPageClick = sectionId => {
    this.props.onAddPage(this.state.section.id);
  };

  setFocused = canvasSectionName => {
    if (canvasSectionName !== this.state.focused) {
      this.setState({ focused: canvasSectionName });
    }
  };

  render() {
    const { breadcrumb, questionnaire, loading } = this.props;
    const { focused, page, section } = this.state;

    if (loading) {
      return null;
    }

    return (
      <BaseLayout breadcrumb={breadcrumb} questionnaire={questionnaire}>
        <Grid align="top">
          <Column cols={2} gutters={false}>
            <div style={{ padding: "1em" }}>
              <ul
                style={{
                  fontSize: "0.9em",
                  paddingLeft: "1em",
                  marginBottom: "1em"
                }}
              >
                {questionnaire.sections.map(section =>
                  <li key={section.id}>
                    <Link
                      to={`/questionnaire/${questionnaire.id}/design/${section.id}`}
                    >
                      {section.title}
                    </Link>
                    {section.pages &&
                      <ul
                        style={{
                          fontSize: "0.9em",
                          paddingLeft: "1em",
                          marginBottom: "1em"
                        }}
                      >
                        {section.pages.map(page =>
                          <li key={page.id}>
                            <Link
                              to={`/questionnaire/${questionnaire.id}/design/${section.id}/${page.id}`}
                            >
                              {page.title}
                            </Link>
                          </li>
                        )}
                      </ul>}
                    <button onClick={this.handleAddPageClick}>
                      + Add page
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </Column>
          <Column gutters={false}>
            <QuestionnaireDesign
              section={section}
              page={page}
              focused={focused}
              onAnswerAdd={this.handleAnswerAdd}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
          </Column>
          <Column cols={2} gutters={false}>
            <PropertyPane>
              <PropertyPaneTitle>Question properties</PropertyPaneTitle>
              <QuestionProperties question={page} onSubmit={noop} />
            </PropertyPane>
          </Column>
        </Grid>
      </BaseLayout>
    );
  }
}

export default QuestionnaireDesignPage;
