var _ = require("underscore");
var S = require("string");

var FORMS = {
  lim: do_lim_form,
  sum: do_sum_form,
  product: do_product_form,
  integral: do_integral_form,
  choose: do_choose_form
};

var DELIMITERS = ["(", ")"];

var OPERATORS = ["+", "-", "*", "/", "//", "^", "_"];

function tokenize (expr) {
  var tokens = ""; expr = S(expr).strip(' ').s;
  for (var i = 0; i < expr.length; i++) {
    var char = expr[i];
    if (char === ",") tokens += " ";
    else if (_.contains(DELIMITERS, char)) tokens += " " + char + " ";
    else if (_.contains(OPERATORS, char)) tokens += " " + char + " ";
    else tokens += char;
  }
  tokens = S(tokens.trim()).collapseWhitespace().s;
  tokens = tokens.split(" ");
  tokens = _.reject(tokens, function (token) {
    return token === " ";
  });
  return tokens;
}

function mafrel_read (tokens) {
  if (tokens[0] === undefined || tokens[0] === null) {
    throw new Error("Unexpected End of Line");
  }
  var current = tokens.shift();
  if (!_contains(DELIMITERS, current)) {

  } else if (current === "(") {
    return 
  } else {
    throw new Error("Unexpected Token: " + current);
  }
}

function read_operation (tokens) {
  if (tokens[0] === undefined || tokens[0] === null) {
    throw new Error("Unexpected End of Line");
  } else
}

function read_tail (tokens) {
  if (tokens[0] === undefined || tokens[0] === null) {
    throw new Error("Unexpected End of Line");
  } else if (tokens[0] === ")") {
    tokens.shift();
    return "";
  } else {

  }
}

function mafrel_eval (tokens) {
  return
}

function mafrel_apply (name, body) {
  return
}

function do_primitive_form(expr) {
  expr = expr.replace('*', '\\times ');
  expr = expr.replace('//', '\\div ');
  expr = expr.replace('infinity', '\\infty ');
  expr = expr.replace('alpha', '\\alpha ');
  expr = expr.replace('beta', '\\beta ');
  expr = expr.replace('Gamma', '\\Gamma ');
  expr = expr.replace('gamma', '\\gamma ');
  expr = expr.replace('Delta', '\\Delta ');
  expr = expr.replace('delta', '\\delta ');
  expr = expr.replace('epsilon', '\\epsilon ');
  expr = expr.replace('Theta', '\\Theta ');
  expr = expr.replace('theta', '\\theta ');
  expr = expr.replace('kappa', '\\kappa ');
  expr = expr.replace('Lambda', '\\Lambda ');
  expr = expr.replace('lambda', '\\lambda ');
  expr = expr.replace('mu', '\\mu ');
  expr = expr.replace('Xi', '\\Xi');
  expr = expr.replace('xi', '\\xi ');
  expr = expr.replace('Pi', '\\Pi ');
  expr = expr.replace('pi', '\\pi ');
  expr = expr.replace('rho', '\\rho ');
  expr = expr.replace('Sigma', '\\Sigma ');
  expr = expr.replace('sigma', '\\sigma ');
  expr = expr.replace('tau', '\\tau ');
  expr = expr.replace('Phi', '\\Phi ');
  expr = expr.replace('phi', '\\phi ');
  expr = expr.replace('Omega', '\\Omega ');
  expr = expr.replace('omega', '\\omega ');

  return expr;
}

function do_lim_form(tokens) {
  if (tokens.length === 3) {
    tokens = map(mafrel_eval, tokens);
    return "\\lim_{"+tokens[1]+"\\to"+tokens[2]+"}{"+tokens[0]+"}";
  } else {
    throw new Error("Invalid Parameter for Limit");
  }
}

function do_sum_form(tokens) {
  if (tokens.length === 4) {
    tokens = map(mafrel_eval, tokens);
    return "\\sum_{"+tokens[1]+"="+tokens[2]+"}^{"+tokens[3]+"}{"+tokens[0]+"}";
  } else {
    throw new Error("Invalid Parameter for Sum");
  }
}

function do_product_form(tokens) {
  if (tokens.length === 4) {
    tokens = map(mafrel_eval, tokens);
    return "\\prod_{"+tokens[1]+"="+tokens[2]+"}^{"+tokens[3]+"}{"+tokens[0]+"}";
  } else {
    throw new Error("Invalid Parameter for Product");
  }
}

function do_integral_form(tokens) {
  if (tokens.length === 4) {
    tokens = map(mafrel_eval, tokens);
    return "\\int_{"+tokens[2]+"}^{"+tokens[3]+"}{"+tokens[0]+"d"+tokens[1]+"}";
  } else {
    throw new Error("Invalid Parameter for Integral");
  }
}

function do_choose_form(tokens) {
  if (tokens.length === 2) {
    tokens = map(mafrel_eval, tokens);
    return "\\binom {"+tokens[0]+"}{"+tokens[1]+"}";
  } else {
    throw new Error("Invalid Parameter for Choose");
  }
}

console.log(tokenize("5"));
console.log(tokenize("limit(x ^ x, x, infinity) * 5"));
console.log(tokenize("limit(sum((x ^ x ^ x), x, 0, 100 + 2), x, infinity) * 5"));
