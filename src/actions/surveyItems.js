export const CHANGE = "CHANGE";
export const ADD_ITEM = "ADD_ITEM";
export const ADD_ITEM_COMPLETE = "ADD_ITEM_COMPLETE";
export const REMOVE_ITEM = "REMOVE_ITEM";

import { replace } from "lodash";

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

export function change(key, value) {
  const [type, id, field] = key.split(".");
  return {
    type: CHANGE,
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
    type: ADD_ITEM,
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
    type: ADD_ITEM_COMPLETE,
    payload: {
      parentType: getParentItemType(type),
      newId: replace(name, / /g, "-").toLowerCase(),
      type,
      id,
      name
    }
  };
}

export function removeItem(type, id) {
  return {
    type: REMOVE_ITEM,
    payload: {
      type,
      id
    }
  };
}
