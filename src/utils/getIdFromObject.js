const getIdFromObject = result => {
  if (result.id && result.__typename) {
    // eslint-disable-line no-underscore-dangle
    return result.__typename + result.id;
    // eslint-disable-line no-underscore-dangle
  }
  return null;
};

export default getIdFromObject;
