var FORMS = {
	lim: do_lim_form,
	sum: do_sum_form,
	product: do_product_form,
	integral: do_integral_form,
	choose: do_choose_form
};

function map (fn, list) {
  console.log("[map](%s)", list.toString());
	var new_list = [];
	for (var i = 0; i < list.length; i++) {
		new_list.push(fn(list[i]));
	}
	return new_list;
}

function filter (fn, list) {
	var new_list = [];
	for (var i = 0; i < list.length; i++) {
		if (fn(list[i])) new_list.push(list[i]);
	}
	return new_list;
}

function has_key_word (expr) {
	return (
		expr.indexOf('lim(') !== -1      ||
		expr.indexOf('sum(') !== -1      ||
		expr.indexOf('product(') !== -1  ||
		expr.indexOf('integral(') !== -1 ||
		expr.indexOf('choose(') !== -1);
}

function get_last_key_word_index (expr) {
	return Math.max(
		expr.indexOf('lim('),
		expr.indexOf('sum('),
		expr.indexOf('product('),
		expr.indexOf('integral('),
		expr.indexOf('choose('));
}

function get_end_bracket_index (expr, start) {
	console.log("scanning through %s", expr);
	var num_left_bracket = 0; var num_right_bracket = 0;
	for (var i = start; i <= expr.length; i++) {
		if (num_left_bracket === num_right_bracket && num_left_bracket !== 0)
			return i - 1;
		if (expr[i] === "(") num_left_bracket++;
		if (expr[i] === ")") num_right_bracket++;
		console.log("%s: (%s, %s)", expr[i], num_left_bracket, num_right_bracket);
	}
	throw new Error("Unclosed Parenthesis");
}

function mafrel_eval (expr) {
  console.log("[eval] %s", expr);
	var is_not_space = function (char) {return char !== ' '};
	expr = filter(is_not_space, expr).join('');
	while (has_key_word(expr)) {
		var start = get_last_key_word_index(expr);
		var end = get_end_bracket_index(expr, start);
		var sliced = expr.slice(start, end + 1);
		console.log("[sliced] %s", sliced);
		var left = sliced.indexOf('(');
		var name = sliced.slice(0, left);
		var body = sliced.slice(left+1, -1);
		expr = expr.slice(0, start) +
					 mafrel_apply(name, body) +
					 expr.slice(end + 1);
	}
	return do_primitive_form(expr);
}

function mafrel_apply (name, body) {
  console.log("[apply] %s with %s", name, body);
	var tokens = body.split(",");
	return FORMS[name](tokens);
}

function do_primitive_form(expr) {
	expr = expr.replace(/\*\*/g, '\\times ');
	expr = expr.replace(/\*/g, ' ');
	expr = expr.replace(/\/\//g, '\\div ');
	expr = expr.replace(/infinity/g, '\\infty ');
	// expr = expr.replace('alpha', '\\alpha ');
	// expr = expr.replace('beta', '\\beta ');
	// expr = expr.replace('Gamma', '\\Gamma ');
	// expr = expr.replace('gamma', '\\gamma ');
	// expr = expr.replace('Delta', '\\Delta ');
	// expr = expr.replace('delta', '\\delta ');
	// expr = expr.replace('epsilon', '\\epsilon ');
	// expr = expr.replace('Theta', '\\Theta ');
	// expr = expr.replace('theta', '\\theta ');
	// expr = expr.replace('kappa', '\\kappa ');
	// expr = expr.replace('Lambda', '\\Lambda ');
	// expr = expr.replace('lambda', '\\lambda ');
	// expr = expr.replace('mu', '\\mu ');
	// expr = expr.replace('Xi', '\\Xi');
	// expr = expr.replace('xi', '\\xi ');
	// expr = expr.replace('Pi', '\\Pi ');
	// expr = expr.replace('pi', '\\pi ');
	// expr = expr.replace('rho', '\\rho ');
	// expr = expr.replace('Sigma', '\\Sigma ');
	// expr = expr.replace('sigma', '\\sigma ');
	// expr = expr.replace('tau', '\\tau ');
	// expr = expr.replace('Phi', '\\Phi ');
	// expr = expr.replace('phi', '\\phi ');
	// expr = expr.replace('Omega', '\\Omega ');
	// expr = expr.replace('omega', '\\omega ');

  return expr;
}

function do_lim_form(tokens) {
	if (tokens.length === 3) {
		return "\\lim_{"+tokens[1]+"\\to"+tokens[2]+"}{"+tokens[0]+"}";
	} else {
		throw new Error("Invalid Parameter for Limit");
	}
}

function do_sum_form(tokens) {
	if (tokens.length === 4) {
		return "\\sum_{"+tokens[1]+"="+tokens[2]+"}^{"+tokens[3]+"}{"+tokens[0]+"}";
	} else {
		throw new Error("Invalid Parameter for Sum");
	}
}

function do_product_form(tokens) {
	if (tokens.length === 4) {
		return "\\prod_{"+tokens[1]+"="+tokens[2]+"}^{"+tokens[3]+"}{"+tokens[0]+"}";
	} else {
		throw new Error("Invalid Parameter for Product");
	}
}

function do_integral_form(tokens) {
	if (tokens.length === 4) {
		return "\\int_{"+tokens[2]+"}^{"+tokens[3]+"}{"+tokens[0]+"d"+tokens[1]+"}";
	} else {
		throw new Error("Invalid Parameter for Integral");
	}
}

function do_choose_form(tokens) {
	if (tokens.length === 2) {
		return "\\binom {"+tokens[0]+"}{"+tokens[1]+"}";
	} else {
		throw new Error("Invalid Parameter for Choose");
	}
}