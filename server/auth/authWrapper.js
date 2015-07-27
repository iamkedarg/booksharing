var passport = require('passport');


module.exports = function authWrapper(destHandler) {
	console.log('adding authwrapper!!!'); 
	return function(req, res, next) {
		console.log('adding req.isAuthenticated()!!!' + req.isAuthenticated()); 
		if (!req.isAuthenticated()) {
			passport.authenticate('cas', function(err, user, next) {
				//case one - something weird happened
				//either hand it to the next in the chain or just log
				console.log('IN cas callback!!!!');
				if (err) {
					if (next) {
						return next(err);
					}
					console.error(err);
				}
				//if we didn't get a user, auth failed.
				//redirect to a login failed page
				if (!user) {
					console.log('IN !user!!!!');
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
					console.log('IN user!!!!');
					res.cookie('user-name', user.login, {
						httpOnly: false
					});

					//return res.redirect(destUrl);
					return res.redirect('/');
				});
			})(req, res, next);
		} else {
			console.log('calling handler!!!!');
			return destHandler(req, res);
		}
	};
};