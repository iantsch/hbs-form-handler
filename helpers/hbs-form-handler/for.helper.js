const operators = {
  '<=': function (a, b) {
    return a <= b
  },
  '<': function (a, b) {
    return a < b
  },
  '==': function (a, b) {
    return a == b
  },
  '>': function (a, b) {
    return a > b
  },
  '>=': function (a, b) {
    return a >= b
  }
};

module.exports = function (from, operator, to, increment, block) {
  var accum = '';
  for (from; operators[operator](from, to); from += increment)
    accum += block.fn(from);
  return accum;
};
