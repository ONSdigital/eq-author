import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "components/Button";
import ButtonGroup from "components/ButtonGroup";
import LinkButton from "components/LinkButton";
import { CenteredPanel } from "components/Panel";
import BaseLayout from "components/BaseLayout";
import { noop } from "lodash";

import CommentsSvg from "./commentsIcon.svg";
import UnreadCommentsSvg from "./unreadComments.svg";
import DeleteSvg from "./trashIcon.svg";

const Center = styled.div`
  width: 100%;
  max-width: 55em;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 0.6em;
  text-transform: uppercase;
  font-weight: 900;
  line-height: 1.5;
  margin: 3em 0 1.5em 0;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 0 0 1em 0;
`;

const Table = styled.table`
  width: 100%;
  font-size: .8em;
`;

const TH = styled.th`
  color: #8e8e8e;
  text-align: center;
  &:nth-child(1) {
    text-align: left;
  }
`;

const TR = styled.tr`
  line-height: 3.5em;
  border: 5px solid red !important;
`;

const TD = styled.td`
  text-align: center;
  &:nth-child(1),
  &:nth-child(5) {
    text-align: left;
  }
`;

const CommentsIcon = ({ hasUnread }) => {
  const StyledSpan = styled.span`
    position: relative;
    width: 2em;
    height: 2em;
  `;

  const StyledButton = styled(Button)`
    width: 18px;
    height: 18px;
    padding: .5em;
    background: url(${CommentsSvg}) no-repeat;
    background-size: contain;
    border: 0;
  `;

  const UnreadIcon = styled.span`
    background: url(${UnreadCommentsSvg}) no-repeat;
    width: 8px;
    height: 8px;
    position: absolute;
    top: -2px;
    right: -4px;
  `;

  return (
    <StyledSpan>
      <StyledButton title={"Click to see comments"} />
      {hasUnread && <UnreadIcon title={"You have unread comments"} />}
    </StyledSpan>
  );
};

CommentsIcon.propTypes = {
  hasUnread: PropTypes.bool.isRequired
};

const DeleteIcon = ({ onClick }) => {
  const StyledButton = styled(Button)`
    width: 16px;
    height: 20px;
    padding: .5em;
    background: url(${DeleteSvg}) no-repeat;
    background-size: contain;
    border: 0;
  `;

  return <StyledButton onClick={onClick} />;
};

DeleteIcon.propTypes = {
  onClick: PropTypes.func.isRequired
};

const ExistingQuetionnairesTable = ({ questionnaires }) => {
  const handleDelete = noop;

  if (questionnaires && questionnaires.length > 0) {
    return (
      <Table>
        <thead>
          <tr>
            <TH>Questionnaire name</TH>
            <TH>Date</TH>
            <TH>Theme</TH>
            <TH>Comments</TH>
            <TH />
          </tr>
        </thead>
        <tbody>
          {questionnaires.map(questionnaire =>
            <TR key={questionnaire.id}>
              <TD>
                {questionnaire.name}
              </TD>
              <TD>
                {questionnaire.date}
              </TD>
              <TD>
                {questionnaire.theme}
              </TD>
              <TD>
                {questionnaire.comments.count > 0 &&
                  <CommentsIcon hasUnread={questionnaire.comments.unread} />}
              </TD>
              <TD>
                {questionnaire.actions.delete &&
                  <DeleteIcon onClick={handleDelete} />}
              </TD>
            </TR>
          )}
        </tbody>
      </Table>
    );
  } else {
    return <p>You have no questionnaires</p>;
  }
};

ExistingQuetionnairesTable.propTypes = {
  questionnaires: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      theme: PropTypes.string.isRequired,
      status: PropTypes.string,
      comments: PropTypes.shape({
        unread: PropTypes.bool.isRequired,
        count: PropTypes.number.isRequired
      }).isRequired,
      actions: PropTypes.shape({
        delete: PropTypes.bool.isRequired
      }).isRequired
    }).isRequired
  )
};

const questionnaireData = [
  {
    id: 1,
    name: "Retail turnover",
    date: "10/07/2017",
    theme: "Business",
    status: "Unpublished",
    comments: {
      unread: true,
      count: 1
    },
    actions: {
      delete: true
    }
  }
];

const Questionnaires = () =>
  <BaseLayout>
    <Center>
      <Title>Your questionnaires</Title>
      <StyledButtonGroup horizontal>
        <LinkButton
          to="/questionnaire/create"
          id="btn-create-questionnaire"
          primary
        >
          Create
        </LinkButton>
        <Button id="btn-load-questionnaire" secondary disabled>
          Upload
        </Button>
      </StyledButtonGroup>
      <CenteredPanel>
        <ExistingQuetionnairesTable questionnaires={questionnaireData} />
      </CenteredPanel>
    </Center>
  </BaseLayout>;

export default Questionnaires;
