import React from 'react'
import styled from 'styled-components'
import {TreeNode} from 'components/TreeMenu'
import AddButton from 'components/AddButton'
import Add from './AddIcon'

const Button = styled(AddButton)`
  padding: 0.5em;
`

const AddIconButton = styled(Add)`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
`

const TreeMenu = styled.div`
  position: relative;
`

const TreeMenuNodes = styled.div`
  margin: 0;
  padding: 0;
`

const Sections = ({sections, addSection, ...otherProps}) =>
  <TreeMenuNodes>
    {
      sections && sections.length > 0
      ? sections.map((section, index) =>
        <TreeNode key={index} label={section.name} sectionNode>
          <Questions questions={section.questions} sectionID={section.id} {...otherProps}/>
        </TreeNode>
      )
      : <Button editLabel="Section name" onApplyLabel={name => addSection(name)}>Add a section</Button>
    }
  </TreeMenuNodes>

const Questions = ({questions, addQuestion, sectionID, ...otherProps}) =>
  <TreeMenuNodes>
    {
      questions && questions.length > 0
      ? questions.map((question, index) =>
        <TreeNode key={index} label={question.name} questionNode>
          <Answers answers={question.answers} questionID={question.id} sectionID={sectionID} {...otherProps} />
        </TreeNode>
      )
      : <Button editLabel="Question name" onApplyLabel={name => addQuestion(name, sectionID)}>Add a question</Button>
    }
  </TreeMenuNodes>

const Answers = ({answers, addAnswer, questionID, sectionID}) =>
  <TreeMenuNodes>
    {
      answers && answers.length > 0
      ? answers.map((answer, index) =>
        <TreeNode key={index} label={answer.name} answerNode />
      )
      : <Button editLabel="Answer name" onApplyLabel={name => addAnswer(name, questionID, sectionID)}>Add a answer</Button>
    }
  </TreeMenuNodes>

export default ({sections, actions, ...otherProps}) => {
  return (
    <TreeMenu>
      <Sections sections={sections} {...otherProps} />
    </TreeMenu>
  )
}
