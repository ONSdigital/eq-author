import React from "react";
import styled from "styled-components";
import { pick, map, isEmpty } from "lodash";
import { TreeNode } from "components/TreeMenu";

const TreeMenu = styled.div`
  position: relative;
`;

const TreeMenuNodes = styled.div`
  margin: 0;
  padding: 0;
`;

const Sections = ({ sections, questions, answers, ...otherProps }) => {
  return (
    !isEmpty(sections) &&
    <TreeMenuNodes>
      {map(sections, (section, id) => (
        <TreeNode
          to={`/design/${id}`}
          key={id}
          id={id}
          label={section.title}
          type="sections"
          {...otherProps}
        >
          <Questions
            questions={pick(questions, section.questions)}
            answers={answers}
            sectionId={id}
            {...otherProps}
          />
        </TreeNode>
      ))}
    </TreeMenuNodes>
  );
};

const Questions = ({ questions, answers, sectionId, ...otherProps }) => {
  return !isEmpty(questions)
    ? <TreeMenuNodes>
        {map(questions, (question, id) => (
          <TreeNode
            to={`/design/${sectionId}/${id}`}
            key={id}
            id={id}
            label={question.displayName}
            type="questions"
            {...otherProps}
          >
            <Answers
              answers={pick(answers, question.answers)}
              sectionId={sectionId}
              questionId={id}
              {...otherProps}
            />
          </TreeNode>
        ))}
      </TreeMenuNodes>
    : <div />;
};

const Answers = ({ answers, sectionId, questionId, ...otherProps }) => {
  return (
    !isEmpty(answers) &&
    <TreeMenuNodes>
      {map(answers, (answer, id) => (
        <TreeNode
          to={`/design/${sectionId}/${questionId}/${id}`}
          id={id}
          key={id}
          label={answer.displayName}
          type="answers"
          {...otherProps}
        />
      ))}
    </TreeMenuNodes>
  );
};

export default props => (
  <TreeMenu>
    <Sections {...props} />
  </TreeMenu>
);
