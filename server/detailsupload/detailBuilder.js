

var Details = function(builder) {
	this.id = builder.id;
	this.fileReadableStream = builder.fileReadableStream;
	this.tags = builder.tags;
};

var DetailBuilder = function(){};
DetailBuilder.prototype.id = function(id) {
	this.id = id;
	return this;
};

DetailBuilder.prototype.fileReadableStream = function(fileReadableStream) {
	this.fileReadableStream = fileReadableStream;
	return this;
};

DetailBuilder.prototype.tags = function(fileReadableStream) {
	this.tags = tags;
	return this;
};

DetailBuilder.prototype.build = function() {
	var details = new Details(this);
	return details;
}

module.exports = DetailBuilder;