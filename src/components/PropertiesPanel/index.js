import React from "react";
import CustomPropTypes from "custom-prop-types";
import styled from "styled-components";
import { colors } from "constants/theme";
import ScrollPane from "components/ScrollPane";
import { noop } from "lodash";
import getIdForObject from "utils/getIdForObject";
import AnswerPropertiesContainer from "containers/AnswerPropertiesContainer";

const PropertiesPane = styled.div`
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border-left: 2px solid #eee;
  font-size: 1em;
`;

const PropertiesPanelTitle = styled.h2`
  font-size: 0.6em;
  text-transform: uppercase;
  font-weight: 900;
  margin: 0;
  line-height: 1.5em;
  position: relative;
  padding: 1.7em 1.4em 0;
`;

const PropertiesPaneBody = styled.div`
  background: ${colors.white};
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;

const PropertiesGroup = styled.div`
  border-bottom: 1px solid ${colors.lightGrey};
  padding: 1em 1em 0;
`;

class PropertiesPanel extends React.Component {
  static propTypes = {
    page: CustomPropTypes.page
  };

  handleSubmit = noop;

  render() {
    const { page } = this.props;
    return (
      <PropertiesPane>
        <PropertiesPaneBody>
          <ScrollPane>
            {page &&
              page.answers.length > 0 && (
                <div>
                  <PropertiesPanelTitle>Answer properties</PropertiesPanelTitle>
                  <PropertiesGroup>
                    {page.answers.map((answer, index) => (
                      <div key={getIdForObject(answer)}>
                        <AnswerPropertiesContainer
                          id={getIdForObject(answer)}
                          answer={{ ...answer, index }}
                          onSubmit={this.handleSubmit}
                        />
                      </div>
                    ))}
                  </PropertiesGroup>
                </div>
              )}
          </ScrollPane>
        </PropertiesPaneBody>
      </PropertiesPane>
    );
  }
}

export default PropertiesPanel;
