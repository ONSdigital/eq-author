/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Grid, Column } from "components/Grid";
import { Form, Field, Input, Label, Select } from "components/Forms";
import Button from "components/Button";
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

class CreateQuestionnairePage extends Component {
  componentWillReceiveProps({ questionnaire }) {
    this.setState(questionnaire);
  }

  onChange = value => {
    this.setState(value);
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onUpdate(this.state);
    this.props.history.push("/design");
  };

  render() {
    const { loading, questionnaire } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    const { title, description, theme, legalBasis } = questionnaire;

    return (
      <div>
        <Form handleSubmit={this.onSubmit}>

          <TabPanel>
            <Field id="title">
              <Label>Title</Label>
              <Input
                defaultValue={title}
                handleChange={this.onChange}
                required
              />
            </Field>
            <Field id="description">
              <Label>Description</Label>
              <Input defaultValue={description} handleChange={this.onChange} />
            </Field>
            <Grid>
              <Column>
                <Field id="theme">
                  <Label>Theme</Label>
                  <Select
                    options={["default", "census", "starwars"]}
                    defaultValue={theme}
                  />
                </Field>
              </Column>
              <Column>
                <Field id="legal_basis">
                  <Label>Legal Basis</Label>
                  <Select
                    options={["StatisticsOfTradeAct"]}
                    defaultValue={legalBasis}
                  />
                </Field>
              </Column>
            </Grid>
          </TabPanel>

          <ActionButtonGroup horizontal>
            <Button type="submit" primary>Create questionnaire</Button>
            <LinkButton to="/" secondary>Cancel</LinkButton>
          </ActionButtonGroup>

        </Form>
      </div>
    );
  }
}

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
