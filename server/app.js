/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');


//mongoose.connect('mongodb://localhost:27017/booksharing');
//mongoose.model('Idea', require('./models/idea').Idea);
// Setup server
var app = express();
var server = require('http').createServer(app);
app.get('/', function(req, res) {
	return res.end('Start Page!!!');
});

app.get('/upload', function(req, res) {
	return res.end('Start Page!!!');
});
require('./config/express')(app);
require('./auth').initialization(app);
require('./auth').stratergy();


require('./api/detailsupload/detailsController')(app);
require('./api/download/downloadController')(app);

// Start server
server.listen(9000, 'localhost', function () {
  console.log('Express server listening on %d, in %s mode');
});

// Expose app
exports = module.exports = app;