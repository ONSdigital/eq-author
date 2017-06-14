/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Grid, Column } from "components/Grid";
import { Field, Input, Label, Select } from "components/Forms";
import LinkButton from "components/LinkButton";
import ButtonGroup from "components/ButtonGroup";
import { TabPanel } from "components/Tabs";

const Center = styled.div`
  width: 100%;
  max-width: 40em;
  display: flex;
  flex-direction: column;
  margin: 2em auto;
`;

const ActionButtonGroup = styled(ButtonGroup)`
  align-self: flex-start;
`;

const handleChange = (e, onUpdate, questionnaire) => {
  e.stopPropagation();

  const updated = {
    ...questionnaire,
    ...{
      [e.target.id]: e.target.value
    }
  };

  onUpdate({ ...updated });
};

const CreateQuestionnairePage = ({ loading, questionnaire, onUpdate }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  const { title, description, theme, legalBasis } = questionnaire;

  return (
    <div>
      <form
        onChange={function(e) {
          handleChange(e, onUpdate, questionnaire);
        }}
      >

        <TabPanel>
          <Field id="title">
            <Label>Title</Label>
            <Input value={title} />
          </Field>
          <Field id="description">
            <Label>Description</Label>
            <Input value={description} />
          </Field>
          <Grid>
            <Column>
              <Field id="theme">
                <Label>Theme</Label>
                <Select
                  options={["default", "census", "starwars"]}
                  value={theme}
                />
              </Field>
            </Column>
            <Column>
              <Field id="legal_basis">
                <Label>Legal Basis</Label>
                <Select options={["StatisticsOfTradeAct"]} value={legalBasis} />
              </Field>
            </Column>
          </Grid>
        </TabPanel>

      </form>
    </div>
  );
};

CreateQuestionnairePage.propTypes = {
  loading: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  questionnaire: PropTypes.shape({
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    legalBasis: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};

export default CreateQuestionnairePage;
