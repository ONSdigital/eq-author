import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import BaseLayout from "components/BaseLayout";
import { CenteredPanel } from "components/Panel";
import ButtonGroup from "components/ButtonGroup";
import Button from "components/Button";
import LinkButton from "components/LinkButton";
import QuestionnairesTable from "./QuestionnairesTable";

const Center = styled.div`
  width: 100%;
  max-width: 55em;
  margin: 0 auto;
`;

const StyledButtonGroup = styled(ButtonGroup)`margin: 0 0 1em 0;`;

const StyledCenteredPanel = styled(CenteredPanel)`padding: 0;`;

const Questionnaires = props => {
  const title = "Your Questionnaires";
  return (
    <BaseLayout title={title} docTitle={title}>
      <Center>
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
        <StyledCenteredPanel>
          {!props.loading && <QuestionnairesTable {...props} />}
        </StyledCenteredPanel>
      </Center>
    </BaseLayout>
  );
};

Questionnaires.propTypes = {
  loading: PropTypes.bool,
  questionnaires: CustomPropTypes.questionnaireList
};

export default Questionnaires;
