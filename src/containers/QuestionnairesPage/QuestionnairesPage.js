import React from "react";
import styled from "styled-components";
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
          <QuestionnairesTable {...props} />
        </CenteredPanel>
      </Center>
    </BaseLayout>
  );
};

Questionnaires.propTypes = {
  questionnaires: CustomPropTypes.questionnaireList
};

export default Questionnaires;
