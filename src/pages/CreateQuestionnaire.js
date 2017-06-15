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

import { debounce } from "lodash";

const ActionButtonGroup = styled(ButtonGroup)`
  align-self: flex-start;
`;

class CreateQuestionnairePage extends Component {
  constructor(props) {
    super(props);
    this.debouncedChangeHandler = debounce(this.onChange.bind(this), 200);
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
                handleChange={this.debouncedChangeHandler}
              />
            </Field>
            <Field id="description">
              <Label>Description</Label>
              <Input
                defaultValue={description}
                handleChange={this.debouncedChangeHandler}
              />
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
                <Field id="legalBasis">
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
  history: PropTypes.object.isRequired, // eslint-disable-line
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
