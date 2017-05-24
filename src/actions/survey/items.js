import { replace } from "lodash";

import { push } from "react-router-redux";

export const ITEM_UPDATE = "ITEM_UPDATE";
export const ITEM_ADD = "ITEM_ADD";
export const ITEM_ADD_COMPLETE = "ITEM_ADD_COMPLETE";
export const ITEM_REMOVE = "ITEM_REMOVE";

export const getChildItemType = parentType => {
  switch (parentType) {
    case "sections":
      return "questions";
    case "questions":
      return "answers";
    default:
      return "sections";
  }
};

export const getParentItemType = type => {
  switch (type) {
    case "questions":
      return "sections";
    case "answers":
      return "questions";
    default:
      return null;
  }
};

export function updateItem(key, value) {
  const [type, id, field] = key.split(".");
  return {
    type: ITEM_UPDATE,
    payload: {
      key,
      value,
      type,
      id,
      field
    }
  };
}

export function addItem(parentType, parentId) {
  return {
    type: ITEM_ADD,
    payload: {
      id: Date.now().toString(),
      type: getChildItemType(parentType),
      parentType,
      parentId
    }
  };
}

export function addItemComplete(type, id, name) {
  return {
    type: ITEM_ADD_COMPLETE,
    payload: {
      parentType: getParentItemType(type),
      newId: replace(name, / /g, "-").toLowerCase(),
      type,
      id,
      name
    }
  };
}

export function deleteItem(type, id) {
  return dispatch => {
    dispatch(removeItem(type, id));
    dispatch(push("/design"));
  };
}

export function removeItem(type, id) {
  return {
    type: ITEM_REMOVE,
    payload: {
      type,
      id
    }
  };
}
