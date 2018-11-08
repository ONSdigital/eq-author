import React from "react";
import { Field } from "components/Forms";
import { colors } from "constants/theme";
import styled from "styled-components";
import CharacterCounter from "components/CharacterCounter";
import WrappingInput from "components/WrappingInput";

export const AliasField = styled(Field)`
  position: relative;
  margin: 0;
`;

export const Alias = styled.div`
  width: 20em;
  position: relative;
`;

const CharCount = styled(CharacterCounter)`
  position: absolute;
  right: 0.5em;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 1em;
  line-height: 1em;
  text-align: right;
  color: ${colors.grey};
`;

const AliasEditor = ({ value, onChange, onUpdate, id, ...otherProps }) => {
  return (
    <Alias>
      <AliasField>
        <WrappingInput
          id={id}
          data-test={id}
          name="alias"
          onChange={onChange}
          onBlur={onUpdate}
          value={value}
          maxLength={255}
          placeholder="Shortcode"
        />
        <CharCount value={value} limit={24} />
      </AliasField>
    </Alias>
  );
};

export default AliasEditor;
