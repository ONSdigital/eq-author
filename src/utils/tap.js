const tap = fn => val => {
  fn(val);
  return val;
};

export default tap;
