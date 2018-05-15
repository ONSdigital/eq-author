import React from "react";
import styled from "styled-components";
import { Column } from "components/Grid";
import ScrollPane from "components/ScrollPane";
import MainCanvas from "components/MainCanvas";
import SavingIndicator from "components/SavingIndicator";
import Tabs from "components/Tabs";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import RoutingEditor from "./RoutingEditor";
import withRouting from "../enhancers/withRouting";
import EditorLayout from "components/EditorLayout";

const Margin = styled.div`
  margin-top: 2em;
`;

class RoutingPageRoute extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire,
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    match: CustomPropTypes.match,
    loading: PropTypes.bool.isRequired
  };

  renderContent() {
    const { questionnaire, section, page, match, loading } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <RoutingEditor
        questionnaire={questionnaire}
        section={section}
        page={page}
        match={match}
      />
    );
  }

  render() {
    return <EditorLayout>{this.renderContent()}</EditorLayout>;
  }
}

export default withRouting(RoutingPageRoute);
