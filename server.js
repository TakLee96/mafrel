var express = require("express");
var app = express();

app.use(function (req, res, next) {
	console.log("[Server] %s -> %s", req.method, req.url);
	if (next) next();
});
app.use(express.static(__dirname));

var server = app.listen((process.env.PORT || 5000), function(){
    console.log("[Server] Listening at %s", server.address().port);
});
