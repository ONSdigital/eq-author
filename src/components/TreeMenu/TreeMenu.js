import React from "react";
import PropTypes from "prop-types";
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

Sections.propTypes = {
  sections: PropTypes.oneOfType([
   PropTypes.object,
   PropTypes.array
 ]),
  questions: PropTypes.object,
  answers: PropTypes.object
}

const Questions = ({ questions, answers, sectionId, ...otherProps }) => {
  if (isEmpty(questions)) {
    return <div />;
  }

  return (
    <TreeMenuNodes>
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
  );
};

Questions.propTypes = {
  questions: PropTypes.object.isRequired,
  answers: PropTypes.object,
  sectionId: PropTypes.oneOfType([
   PropTypes.number,
   PropTypes.string
 ]),
}

const Answers = ({ answers, sectionId, questionId, ...otherProps }) => {
  if (isEmpty(answers)) {
    return null;
  }

  return (
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

Answers.propTypes = {
  answers: PropTypes.object.isRequired,
  sectionId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired
}

export default props => (
  <TreeMenu>
    <Sections {...props} />
  </TreeMenu>
);
