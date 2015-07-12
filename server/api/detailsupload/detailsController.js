var multiparty = require('multiparty');
var DetailsBuilder = require('./detailsBuilder');
var deepcopy = require('deepcopy');
var detailsService = require('./detailsService');
var fs = require('fs');
var streamToBuffer = require('stream-to-buffer');
module.exports = function(app) {
	app.post('/upload', function(req, res, next) {
		var form = new multiparty.Form();
		var count = 0;
		var detailsBuilder = new DetailsBuilder();
		form.on('error', function(err) {
			console.log('Error parsing form: ' + err.stack);
			res.end('Ooops!!! Form passed is not proper');
		});

		form.on('part', function(part) {
			if (part.filename) {
				count++;
  				streamToBuffer(part, function (err, buffer) {
  					detailsBuilder.fileBuffer(buffer);
  					detailsBuilder.filename(part.filename);
    				part.resume();
				});
				
			}

			part.on('error', function(err) {
				console.log('Error occured!!!!');
				res.end('There was something wrong with the part value passed in the form!!!!' + err);
			});
		});

		form.on('field', function(name, value) {
			switch(name) {
				case 'id':
					detailsBuilder.id(value);
					break;
				case 'tags':
					detailsBuilder.tags(value);
					break;
			}
		});

		// Close emitted after form parsed 
		form.on('close', function() {
			var details = detailsBuilder.build();
			detailsService.uploadDetails(details);
			console.log('Upload completed!');
			res.end('Received ' + count + ' files');
		});

		// Parse req 
		form.parse(req);
	});
};