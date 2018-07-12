import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { radius } from "constants/theme";
import findEntitiesByType from "../utils/findEntitiesByType";
import getEntities from "../utils/getEntities";
import replaceEntityText from "../utils/replaceEntityText";
import { Modifier } from "draft-js";
import { bindKey } from "lodash";

export const ENTITY_TYPE = "PIPED-DATA";

export const filterConfig = {
  type: ENTITY_TYPE,
  attributes: ["id", "type"]
};

const PipedValueDecorator = styled.span`
  background-color: #e0e0e0;
  padding: 0 0.125em;
  border-radius: ${radius};
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

export const replacePipedValues = labels => (
  contentState,
  { entityKey, blockKey, entity }
) => {
  const text = labels.hasOwnProperty(entity.data.id)
    ? labels[entity.data.id]
    : "Deleted Piped Value";

  return text
    ? replaceEntityText(contentState, entityKey, blockKey, `[${text}]`)
    : contentState;
};

export const insertPipedValue = (answer, contentState, selection) => {
  const newContent = createPipedEntity(
    bindKey(contentState, "createEntity"),
    answer
  );

  const entityKey = newContent.getLastCreatedEntityKey();
  const text = answer.label || "Piped Value";

  return Modifier.insertText(
    newContent,
    selection,
    `[${text}]`,
    null,
    entityKey
  );
};

export default {
  strategy: findEntitiesByType(ENTITY_TYPE),
  component: PipedValueDecorator
};
