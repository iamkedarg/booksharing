var passport = require('passport');

module.exports = function(app) {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function(user, done) {
		return done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		return done(null, obj);
	});
};