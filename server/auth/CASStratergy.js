module.exports = function init() {
	passport.use(new(require('passport-cas').Strategy)({
		version: 'CAS3.0',
		ssoBaseURL: 'https://' + props['cas.url'],
		serverBaseURL: 'http://' + props['socialmanager.domain'],
		validateURL: '/serviceValidate'
	}, function(profile, done) {
		var user = {};
		user.login = profile.user;
		return done(null, user);
	}));
};