export const META_UPDATE = "META_UPDATE";

export function updateMeta(key, value) {
  return {
    type: META_UPDATE,
    payload: {
      key,
      value
    }
  };
}
