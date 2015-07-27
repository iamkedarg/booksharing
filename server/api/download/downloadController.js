var fileUtil = require('../utils/fileUtil');
module.exports = function(app) {
	app.get('/download', function(req, resp, next) {
		var id = req.query.id;
		var fileName = req.query.fileName;
		var stream = fileUtil.createFileStream(id, fileName);
		resp.contentType('application/pdf');
		stream.pipe(resp);
		return;
	});
};