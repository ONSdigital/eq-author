import React from 'react';
import styled from 'styled-components';
import {TreeNode} from 'components/TreeMenu';
import AddButton from 'components/AddButton';

const Button = styled(AddButton)`
  padding: 0.5em;
`;

const TreeMenu = styled.div`
  position: relative;
`;

const TreeMenuNodes = styled.div`
  margin: 0;
  padding: 0;
`;

const Sections = ({sections, addSection, ...otherProps}) => (
  <TreeMenuNodes>
    {sections
      ? Object.keys(sections).map(id => (
          <TreeNode
            to={`/design/${id}`}
            key={id}
            label={sections[id].title}
            type="section"
          >
            <Questions
              questions={sections[id].questions}
              sectionID={id}
              {...otherProps}
            />
          </TreeNode>
        ))
      : <Button
          editLabel="Section name"
          onApplyLabel={name => addSection(name)}
        >
          Add a section
        </Button>}
  </TreeMenuNodes>
);

const Questions = ({questions, addQuestion, sectionID, ...otherProps}) => (
  <TreeMenuNodes>
    {questions
      ? Object.keys(questions).map(id => (
          <TreeNode
            to={`/design/${id}`}
            key={id}
            label={questions[id].label}
            type="question"
          >
            <Answers
              answers={questions[id].answers}
              questionID={id}
              sectionID={sectionID}
              {...otherProps}
            />
          </TreeNode>
        ))
      : <Button
          editLabel="Question name"
          onApplyLabel={name => addQuestion(name, sectionID)}
        >
          Add a question
        </Button>}
  </TreeMenuNodes>
);

const Answers = ({answers, addAnswer, questionID, sectionID}) => (
  <TreeMenuNodes>
    {answers
      ? Object.keys(answers).map(id => (
          <TreeNode
            to={`/design/${id}`}
            id={id}
            key={id}
            label={answers[id].label}
            type="answer"
          />
        ))
      : <Button
          editLabel="Answer name"
          onApplyLabel={name => addAnswer(name, questionID, sectionID)}
        >
          Add a answer
        </Button>}
  </TreeMenuNodes>
);

export default props => (
  <TreeMenu>
    <Sections {...props} />
  </TreeMenu>
);
