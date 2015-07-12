var fileUtil = require('../utils/fileUtil');
var Service = function() {};
Service.prototype.uploadDetails = function(details) {
	var buffer = details.buffer;
	var id = details.id;
	var path = fileUtil.getFileUploadPathForId(id);
	path = details.path = path + '/' + details.fileName;
	fileUtil.storeBufferToFile(path, buffer);
};
module.exports = new Service();