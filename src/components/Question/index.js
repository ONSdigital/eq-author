import React, { Component } from "react";
import { Field, Input, Label } from "components/Forms";
import RichTextArea from "components/RichTextArea";

export default class Question extends Component {
  handleChange = e => {
    const { name, value } = e.target;

    this.props.changeQuestion({
      [name]: value
    });
  }

  render() {
    const { id, number, title, guidance } = this.props.question;

    return (
      <fieldset onChange={this.handleChange}>
        <legend>Question</legend>
        <Field id="id">
          <Label>Question ID</Label>
          <Input value={id} name="id" />
        </Field>
        <Field id="number">
          <Label>Question Number</Label>
          <Input value={number} name="number" />
        </Field>
        <Field id="title">
          <Label>Question Title</Label>
          <Input value={title} name="title" />
        </Field>
        <Field>
          <Label htmlFor="guidancetitle">Guidance Title</Label>
          <Input value={guidance.title} id="guidancetitle" name="guidance.title" />
        </Field>
        <Field>
          <Label htmlFor="guidancetext">Guidance Text</Label>
          <RichTextArea
            onChange={this.handleChange}
            value={guidance.text}
            id="guidancetext"
            name="guidance.text"
            rows="10"
          />
        </Field>
      </fieldset>
    );
  }
}
