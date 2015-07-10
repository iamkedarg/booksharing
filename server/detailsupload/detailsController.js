var multiparty = require('multiparty');
var fs = require('fs');
module.exports = function(app) {
	app.post('/upload', function(req, res, next) {
		var form = new multiparty.Form();

		// {
		// 	'autoFiles': true,
		// 	'uploadDir': '/Users/jadhavk/uploads'
		// }


		// form.parse(req, function(err, fields, files) {
		// 	console.log('fields are ' + JSON.parse(fields));
		// 	// var data = JSON.parse(fields.post);
		// 	// var name = data.name;
		// 	// if(files.file) {
		// 	// 	for(var i=0 ;i<files.file.length; i++) {
		// 	// 		var actualFile = files.file[i];
		// 	// 		var origionalFileName = actualFile.originalFilename;
		// 	// 		var path = actualFile.path;
		// 	// 	}
		// 	// }
		// });

		var count = 0;
		form.on('error', function(err) {
			console.log('Error parsing form: ' + err.stack);
		});


		form.on('part', function(part) {
			if (!part.filename) {
				console.log('got field named ' + part.name);
				part.resume();
			}

			if (part.filename) {
				count++;
				var writable = fs.createWriteStream('/Users/jadhavk/uploads/file.doc');
				console.log('got file named ' + part.name);
				console.log('file path ' + typeof part);
				part.pipe(writable);
				part.resume();
			}

			part.on('error', function(err) {
				console.log('Error occured!!!!');
			});
		});

		// Close emitted after form parsed 
		form.on('close', function() {
			console.log('Upload completed!');
			res.end('Received ' + count + ' files');
		});

		// Parse req 
		form.parse(req);
	});
};