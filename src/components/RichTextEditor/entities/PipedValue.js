import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "constants/theme";
import findEntitiesByType from "../utils/findEntitiesByType";
import getEntities from "../utils/getEntities";

export const ENTITY_TYPE = "PIPED-DATA";

const PipedValueDecorator = styled.span`
  background-color: ${colors.borders};
  padding: 0 0.125em;
  border-radius: 3px;
  white-space: pre;
`;

const PipedValueSerialized = ({ data: { id, type } }) => (
  <span data-piped="answers" data-id={id} data-type={type}>
    [Piped Value]
  </span>
);

PipedValueSerialized.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
};

export const findPipedEntities = contentState =>
  getEntities(contentState, ENTITY_TYPE);

export const createPipedEntity = (create, { type, id }) => {
  return create(ENTITY_TYPE, "IMMUTABLE", {
    type,
    id
  });
};

export const htmlToEntity = (nodeName, node, createEntity) => {
  if (node.hasAttribute && node.hasAttribute("data-piped")) {
    const id = node.getAttribute("data-id");
    const type = node.getAttribute("data-type");
    return createPipedEntity(createEntity, { id, type });
  }
};

export const entityToHTML = {
  [ENTITY_TYPE]: PipedValueSerialized
};

export default {
  strategy: findEntitiesByType(ENTITY_TYPE),
  component: PipedValueDecorator
};
