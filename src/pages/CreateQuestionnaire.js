/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Grid, Column } from "components/Grid";
import { Form, Field, Input, Label, Select, TextArea } from "components/Forms";
import Button from "components/Button";
import LinkButton from "components/LinkButton";
import ButtonGroup from "components/ButtonGroup";
import Panel from "components/Panel";

import { debounce } from "lodash";

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

export class CreateQuestionnairePage extends Component {
  constructor(props) {
    super(props);
    this.debouncedChangeHandler = debounce(this.onChange.bind(this), 300, {
      leading: true
    });
  }

  componentWillReceiveProps({ questionnaire }) {
    this.setState(questionnaire);
  }

  onChange = value => {
    this.setState(value, () => {
      this.props.onUpdate(this.state);
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.history.push("/design");
  };

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderForm(questionnaire) {
    return (
      <Form handleSubmit={this.onSubmit}>
        <Field id="title">
          <Label>Questionnaire Title</Label>
          <Input
            defaultValue={questionnaire.title}
            handleChange={this.debouncedChangeHandler}
          />
        </Field>
        <Field id="description">
          <Label>Description</Label>
          <TextArea
            defaultValue={questionnaire.description}
            rows={4}
            handleChange={this.debouncedChangeHandler}
          />
        </Field>
        <Grid>
          <Column cols={6}>
            <Field id="theme">
              <Label>Theme</Label>
              <Select
                options={["default", "census", "starwars"]}
                defaultValue={questionnaire.theme}
                handleChange={this.debouncedChangeHandler}
              />
            </Field>
          </Column>
          <Column cols={6}>
            <Field id="legal_basis">
              <Label>Legal Basis</Label>
              <Select
                options={["StatisticsOfTradeAct"]}
                defaultValue={questionnaire.legalBasis}
                handleChange={this.debouncedChangeHandler}
              />
            </Field>
          </Column>
        </Grid>
        <Field id="navigation">
          <Input
            type="checkbox"
            defaultChecked={questionnaire.navigation}
            handleChange={this.debouncedChangeHandler}
          />
          <Label inline>Navigation</Label>
        </Field>
        <ActionButtonGroup horizontal>
          <Button type="submit" primary>Next</Button>
          <LinkButton to="/" secondary>Cancel</LinkButton>
        </ActionButtonGroup>

      </Form>
    );
  }

  render() {
    const { loading, questionnaire } = this.props;

    return (
      <Center>
        <Panel>
          {loading ? this.renderLoading() : this.renderForm(questionnaire)}
        </Panel>
      </Center>
    );
  }
}

CreateQuestionnairePage.propTypes = {
  history: PropTypes.object, // eslint-disable-line
  loading: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  questionnaire: PropTypes.shape({
    description: PropTypes.string.isRequired,
    legalBasis: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};

export default CreateQuestionnairePage;
