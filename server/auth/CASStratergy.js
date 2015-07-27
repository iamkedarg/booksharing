
var passport = require('passport');
module.exports = function init() {
	passport.use(new(require('passport-cas').Strategy)({
		version: 'CAS3.0',
		ssoBaseURL: 'https://caslogin-dit.cobalt.com/cas',
		serverBaseURL: 'http://localhost:9000',
		validateURL: '/serviceValidate'
	}, function(profile, done) {
		var user = {};
		console.log('In user!!!!!!!!');
		user.login = profile.user;
		return done(null, user);
	}));
};