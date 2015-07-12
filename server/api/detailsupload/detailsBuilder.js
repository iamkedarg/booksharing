
var Details = function(builder) {
	this.id = builder.personId;
	this.buffer = builder.buffer;
	this.tags = builder.fileTags;
	this.fileName = builder.name;
};

var DetailsBuilder = function(){};
DetailsBuilder.prototype.id = function(id) {
	this.personId = id;
	return this;
};

DetailsBuilder.prototype.fileBuffer = function(buffer) {
	this.buffer = buffer;
	return this;
};

DetailsBuilder.prototype.tags = function(tags) {
	this.fileTags = tags;
	return this;
};

DetailsBuilder.prototype.filename = function(filename) {
	this.name = filename;
	return this;
};

DetailsBuilder.prototype.build = function() {
	var details = new Details(this);
	return details;
}

module.exports = DetailsBuilder;