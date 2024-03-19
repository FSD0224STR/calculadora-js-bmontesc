const add = function(a, b) {
  if ((typeof a !== "number") || (typeof b !== "number")) return 'ERROR'

  return a+b
};

const subtract = function(a, b) {
  if ((typeof a !== "number") || (typeof b !== "number")) return 'ERROR'

  return a-b
};

const multiply = function(a, b) {
  if ((typeof a !== "number") || (typeof b !== "number")) return 'ERROR'

  return a*b
};

const divide = function(a, b) {
  if ((typeof a !== "number") || (typeof b !== "number")) return 'ERROR'

  return Number((parseFloat(a)/parseFloat(b)).toFixed(8))
};

const sqrt = function(a) {
  if (typeof a !== "number") return 'ERROR'

  return Number((Math.sqrt(a)).toFixed(8))
};

const power = function(a, b) {
  if ((typeof a !== "number") || (typeof b !== "number")) return 'ERROR'

  let result = 1
	for (let i = 0; i < b; i++) {
    result = multiply([result, a])
  }

  return result

};

const factorial = function(a) {
  if ((typeof a !== "number") || a < 0) return 'ERROR'

  let result = 1

  for (let i = 1; i <= a; i++) {
    result = multiply([result,i])
  }

  return result

};