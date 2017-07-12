import React from "react";
import styled from "styled-components";
import Button from "components/Button";
import ButtonGroup from "components/ButtonGroup";
import LinkButton from "components/LinkButton";
import { CenteredPanel } from "components/Panel";
import BaseLayout from "components/BaseLayout";

const Center = styled.div`
  width: 100%;
  max-width: 25em;
  margin: 0 auto;
`;

const Questionnaires = () =>
  <BaseLayout title="Select to begin">
    <Center>
      <CenteredPanel>
        <ButtonGroup vertical>
          <LinkButton
            to="/questionnaire/create"
            id="btn-create-questionnaire"
            primary
          >
            Create questionnaire
          </LinkButton>
          <Button id="btn-load-questionnaire" secondary disabled>
            Load existing questionnaire
          </Button>
        </ButtonGroup>
      </CenteredPanel>
    </Center>
  </BaseLayout>;

export default Questionnaires;
