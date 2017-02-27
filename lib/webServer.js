"use strict";
 
// *** PUBLIC LIBRARIES ***
    var express = require('express');						// http://expressjs.com/en									npm install express --save
    var http = require('http');								// https://nodejs.org/api/http.html
    var https = require('https');							// https://nodejs.org/api/https.html
    var fs = require('fs');									// https://nodejs.org/api/fs.html
    var bodyParser = require('body-parser');				// https://www.npmjs.com/package/body-parser				npm install body-parser --save
    var multer = require('multer');							// https://www.npmjs.com/package/multer						npm install multer --save
    var queryString = require('query-string');				// https://www.npmjs.com/package/query-string				npm install query-string --save
	var env = require('node-env-file');						// https://github.com/grimen/node-env-file					npm install node-env-file --save
	var cookieSession = require('cookie-session');			// https://www.npmjs.com/package/cookie-session				npm install cookie-session --save
    
// *** PARSERS
	exports.parseJson = bodyParser.json();										// JSON
	exports.parseRaw = bodyParser.raw();										// BINARY
	exports.parseText = bodyParser.text({type:'*/*'});							// TEXT
	exports.parseUrlEncoded = bodyParser.urlencoded({ extended: false });		// URLEncoded
	exports.parseFormWithAttachments = multer();								// Forms with attachments

// *** BUILD SERVER
	exports.build = function() {
		// Initialize server
		var app = express();
		app.set('view engine', 'ejs');
		app.use(express.static(__dirname + '/../public'));
	
		// Create the webserver
		var port = process.env.PORT || 5000;
		http.createServer(app).listen(port);
		
		// Reads configuration from .env, if file does not exist then ignore
		try {
			env(__dirname + '/../env');
			console.log("ENV: " + process.env.LOCATION);
		} catch (e) {
			console.log("Warning: The file 'env' was not found, so no settings were loaded");
		}
		
		// Session data will be stored using "Cookie-based Session"
		// Although this is NOT secured and does NOT allow for multiple dynos in Heroku,
		// it may be appropriate for this simple demo to avoid setting up addons.
		app.use(cookieSession({
			name: 'session',
			keys: ['key1', 'key2']
		}));
		
		console.log("The server is running in port " + port);
		return app;
	}
