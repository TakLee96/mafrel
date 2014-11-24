function handleInput() {
    var expr = document.getElementById("input").innerHTML;
    try {
        renderOutputHTML(expr);
    } catch (e) {
        document.getElementById("output").innerHTML = "<strong>Error: </strong>" + e.message;
    }
}

function renderOutputHTML (expr) {
    var count = 0;
    var rendered = [];

    while (expr.indexOf('{{') !== -1) {
        var start = expr.indexOf('{{');
        var end = expr.indexOf('}}');
        if (end === -1) throw new Error("Unclosed Double Braces");
        if (start >= end) throw new Error("Wrong Order of Double Braces");
        var elem = "<span id='output-id-" + count + "'></span>"; count++;
        rendered.push(mafrel_eval(expr.slice(start+2, end)));
        expr = expr.slice(0, start) + elem + expr.slice(end+2);
    }

    document.getElementById("output").innerHTML = expr;

    for (var i = 0; i < count; i++) {
        katex.render(rendered[i], document.getElementById("output-id-" + i));
    }
}
