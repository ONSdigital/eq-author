import React from "react";
import styled from "styled-components";
import { Column } from "components/Grid";
import ScrollPane from "components/ScrollPane";
import MainCanvas from "components/MainCanvas";
import SavingIndicator from "components/SavingIndicator";
import Tabs from "components/Tabs";
import CustomPropTypes from "custom-prop-types";
import RoutingEditor from "./RoutingEditor";

const Margin = styled.div`
  margin-top: 2em;
`;

class RoutingPageRoute extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire.isRequired,
    section: CustomPropTypes.section.isRequired,
    page: CustomPropTypes.page.isRequired,
    match: CustomPropTypes.match
  };

  render() {
    const { questionnaire, section, page, match } = this.props;
    return (
      <Column gutters={false}>
        <ScrollPane>
          <Margin>
            <MainCanvas>
              <SavingIndicator />
              <Tabs questionnaire={questionnaire} section={section} page={page}>
                <RoutingEditor
                  questionnaire={questionnaire}
                  section={section}
                  page={page}
                  match={match}
                />
              </Tabs>
            </MainCanvas>
          </Margin>
        </ScrollPane>
      </Column>
    );
  }
}

export default RoutingPageRoute;
