"use strict";

var webServer = require('./lib/webServer');
var ws = webServer.build();

ws.get('/', function(reqHTTP, resHTTP) {
	console.log('URL Parameters: ', reqHTTP.query);
	var params = {};
	params.dttm = new Date();
	resHTTP.render('helloWorld', params);
});

ws.post('/', webServer.parseUrlEncoded, function(reqHTTP, resHTTP) {
	console.log('Body: ', reqHTTP.body);
	var params = {};
	params.fname = reqHTTP.body.fname;
	resHTTP.render('helloWorld', params);
});
