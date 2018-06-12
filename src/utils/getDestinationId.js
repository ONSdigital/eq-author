// eslint-disable no-underscore-dangle
const getDestinationId = destination => {
  if (destination.hasOwnProperty("logicalDestination")) {
    return destination.logicalDestination;
  } else if (destination.hasOwnProperty("absoluteDestination")) {
    return (
      destination.absoluteDestination.__typename +
      destination.absoluteDestination.id
    );
  } else {
    throw new Error(`Cannot construct Id for destination ${destination}`);
  }
};

export default getDestinationId;
