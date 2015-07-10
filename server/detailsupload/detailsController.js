var multiparty = require('multiparty');
var fs = require('fs');
var DetailBuilder = require('./detailBuilder');
var deepcopy = require('deepcopy');
var detailsService = require('./detailsService');
module.exports = function(app) {
	app.post('/upload', function(req, res, next) {
		var form = new multiparty.Form();
		var count = 0;
		var detailBuilder = new DetailBuilder();
		form.on('error', function(err) {
			console.log('Error parsing form: ' + err.stack);
		});

		form.on('part', function(part) {
			if (!part.filename) {
				if(part.id) {
					detailBuilder.id(deepcopy(part.id));
				}else if(part.tags) {
					detailBuilder.tags(deepcopy(part.tags));
				}
				part.resume();
			}
			
			if (part.filename) {
				count++;
				detailBuilder.fileReadableStream(deepcopy(part));
				part.resume();
			}

			part.on('error', function(err) {
				console.log('Error occured!!!!');
			});
		});

		// Close emitted after form parsed 
		form.on('close', function() {
			var details = detailBuilder.build();
			detailsService.uploadDetails(details);
			console.log('Upload completed!');
			res.end('Received ' + count + ' files');
		});

		// Parse req 
		form.parse(req);
	});
};