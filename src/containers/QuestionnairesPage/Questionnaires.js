import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "components/Button";
import ButtonGroup from "components/ButtonGroup";
import LinkButton from "components/LinkButton";
import Panel from "components/Panel";
import BaseLayout from "components/BaseLayout";

const Center = styled.div`
  width: 100%;
  max-width: 25em;
  margin: 0 auto;
`;

const Questionnaires = () =>
  <BaseLayout title="Select to begin" hasNav={false}>
    <Center>
      <Panel>
        <ButtonGroup vertical>
          <LinkButton
            to="/questionnaire/create"
            id="btn-create-questionnaire"
            primary
          >
            Create questionnaire
          </LinkButton>
          <Button secondary disabled>
            Load existing questionnaire
          </Button>
        </ButtonGroup>
      </Panel>
    </Center>
  </BaseLayout>;

Questionnaires.propTypes = {
  onFileSelected: PropTypes.func.isRequired
};

export default Questionnaires;
