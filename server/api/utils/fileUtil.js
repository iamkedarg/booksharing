var FileUtil = function() {};
var fs = require('fs');
FileUtil.prototype.storeBufferToFile = function(path, buffer) {
	fs.writeFileSync(path, buffer);
};

FileUtil.prototype.getFileUploadPathForId = function(id) {
	var path = '/Users/jadhavk/uploads/' + id;
	if (!this.isDirectory(path)) {
		fs.mkdirSync(path);
	}
	return path;
};

FileUtil.prototype.isDirectory = function(path) {
	var isDirectory = true;
	try {
		var stats = fs.statSync(path);
		if (!stats || !stats.isDirectory()) {
			isDirectory = false;
		}
	} catch (e) {
		isDirectory = false;
	}
	return isDirectory;
};
module.exports = new FileUtil();