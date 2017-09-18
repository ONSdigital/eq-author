import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "components/Button";
import ButtonGroup from "components/ButtonGroup";
import LinkButton from "components/LinkButton";
import { CenteredPanel } from "components/Panel";
import BaseLayout from "components/BaseLayout";
import { noop } from "lodash";
import { colors } from "../../constants/theme";

import { NavLink } from "react-router-dom";

import CommentsSvg from "./commentsIcon.svg";
import UnreadCommentsSvg from "./unreadComments.svg";
import DeleteSvg from "./trashIcon.svg";

const questionnairesListPropType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
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
);

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${colors.blue};
  opacity: 1;
  transition: opacity .2s ease-in-out;
  &:hover {
    opacity: .7;
  }
`;

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
  border-collapse: collapse;
`;

const TH = styled.th`
  color: #8e8e8e;
  text-align: center;
  padding-bottom: 1.5em;
  &:nth-child(1) {
    text-align: left;
  }
`;

const TR = styled.tr`border-top: 1px solid #e2e2e2;`;

const TD = styled.td`
  padding: 1.1em 0;
  text-align: center;
  &:nth-child(1),
  &:nth-child(6) {
    text-align: left;
  }
`;

const CommentsIcon = ({ hasUnread }) => {
  const handleClick = () => {
    alert("Not implemented yet.");
  };

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
      <StyledButton title={"Click to see comments"} onClick={handleClick} />
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

  return <StyledButton title="Delete questionnaire" onClick={onClick} />;
};

DeleteIcon.propTypes = {
  onClick: PropTypes.func.isRequired
};

const ExistingQuetionnairesTable = props => {
  const handleDelete = noop;

  const { questionnaires } = props;
  if (questionnaires && questionnaires.length > 0) {
    return (
      <Table>
        <thead>
          <tr>
            <TH>Questionnaire name</TH>
            <TH>Date</TH>
            <TH>Theme</TH>
            <TH>Status</TH>
            <TH>Comments</TH>
            <TH />
          </tr>
        </thead>
        <tbody>
          {questionnaires.map(questionnaire => {
            const date = new Date(questionnaire.createdAt);
            const dd = date.getDate();
            const mm = date.getMonth() + 1;
            const yyyy = date.getFullYear();

            const url = `/questionnaire/${questionnaire.id}/design/${questionnaire
              .sections[0].id}/${questionnaire.sections[0].pages[0].id}/`;

            return (
              <TR key={questionnaire.id}>
                <TD>
                  <Link to={url}>
                    {questionnaire.title}
                  </Link>
                </TD>
                <TD>
                  {`${dd}/${mm}/${yyyy}`}
                </TD>
                <TD>
                  {questionnaire.theme}
                </TD>
                <TD>
                  {questionnaire.status}
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
            );
          })}
        </tbody>
      </Table>
    );
  } else {
    return <p>You have no questionnaires</p>;
  }
};

ExistingQuetionnairesTable.propTypes = {
  questionnaires: questionnairesListPropType
};

const Questionnaires = props => {
  return (
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
          <ExistingQuetionnairesTable {...props} />
        </CenteredPanel>
      </Center>
    </BaseLayout>
  );
};

Questionnaires.propTypes = {
  questionnaires: questionnairesListPropType
};
export default Questionnaires;
