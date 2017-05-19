import React from "react";
import { storiesOf } from "@kadira/storybook";

import { TreeMenuContainer } from "components/TreeMenu";
import styled from "styled-components";
import { colorDarkBlue } from "constants/theme";

const Sidebar = styled.div`
  background: ${colorDarkBlue};
  max-width: 15em;
`;

storiesOf("TreeMenu", module)
  .addDecorator(story =>
    <Sidebar>{story()}</Sidebar>)
  .add("No sections", () => (
    <Sidebar>
      <TreeMenuContainer sections={{}} />
    </Sidebar>
  ))
  .add("One section", () => (
    <Sidebar>
      <TreeMenuContainer sections={[{
        id: "no-of-employees",
        name: "Number of employees",
        questions: []
      }
      ]}
      />
    </Sidebar>
  ))
  .add("One section, one question", () => (
    <Sidebar>
      <TreeMenuContainer sections={[{
        id: "no-of-employees",
        name: "Number of employees",
        questions: [{
          "id": "number-of-employees-question",
          "name": "Employees",
          "answers": []
        }]
      }, {
        id: "no-of-employees-2",
        name: "Number of employees 2",
        questions: [{
          "id": "number-of-employees-question-2",
          "name": "Employees 2",
          "answers": []
        }]
      }]}
      />
    </Sidebar>
  ))
  .add("One section, question and answers", () => (
    <Sidebar>
      <TreeMenuContainer sections={[{
        "id": "number-of-employees-section",
        "name": "Number of employees",
        "questions": [{
          "id": "number-of-employees-question",
          "name": "Employees",
          "answers": [{
            "id": "number-of-employees-male-more-30-hours",
            "name": "Number of male employees working more than 30 hours per week",
          }, {
            "id": "number-of-employees-male-less-30-hours",
            "name": "Number of male employees working 30 hours or less per week",
          }, {
            "id": "number-of-employees-female-more-30-hours",
            "name": "Number of female employees working more than 30 hours per week",
          }, {
            "id": "number-of-employees-female-less-30-hours",
            "name": "Number of female employees working 30 hours or less per week",
          }, {
            "id": "number-of-employees-total",
            "name": "Total number of employees",
          }]
        }
        ]
      }]}
      />
    </Sidebar>
  ));
