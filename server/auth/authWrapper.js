var passport = require('passport');


module.exports = function authWrapper(destHandler) {
	return function(req, resp, next) {
		if (!req.isAuthenticated()) {
			passport.authenticate('cas', function(err, user, next) {
				//case one - something weird happened
				//either hand it to the next in the chain or just log
				if (err) {
					if (next) {
						return next(err);
					}
					console.error(err);
				}
				//if we didn't get a user, auth failed.
				//redirect to a login failed page
				if (!user) {
					return res.redirect('/login');
				}
				req.logIn(user, function(err) {
					if (err) {
						console.error(err);
						if (next) {
							return next(err);
						}
					}
					//req.session.maxAge = sessionTimeout;
					req.session.messages = '';

					res.cookie('user-name', user.login, {
						httpOnly: false
					});

					//return res.redirect(destUrl);
					return destHandler(req, res);
				});
			})(req, res, next);
		} else {
			return destHandler(req, res);
		}
	};
};