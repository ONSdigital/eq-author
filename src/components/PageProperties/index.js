import React from "react";
import PropTypes from "prop-types";

import CustomPropTypes from "custom-prop-types";
import { Form, Field, Label, Select, Number } from "components/Forms";

const PageProperties = ({
  page,
  orderMin,
  orderMax,
  onChange,
  onSubmit,
  onBlur
}) =>
  <Form onSubmit={onSubmit}>
    <Field id="page.type">
      <Label>Page type</Label>
      <Select
        options={["Question", "Interstitial"]}
        defaultValue={page.type}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Field>
    <Field id="page.order">
      <Label>Order</Label>
      <Number
        value={page.order || "0"}
        onChange={onChange}
        onBlur={onBlur}
        min={orderMin}
        max={orderMax}
      />
    </Field>
  </Form>;

PageProperties.propTypes = {
  page: CustomPropTypes.page.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  orderMin: PropTypes.number.isRequired,
  orderMax: PropTypes.number.isRequired
};

PageProperties.defaultProps = {
  orderMin: 0
};

export default PageProperties;
