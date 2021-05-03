function authController() {
	return {
		register: (req, res, next) => {
			res.render('auth/register')
			next()
		},
		login: (req, res, next) => {
			res.render('auth/login')
			next()
		},
	}
}

module.exports = authController
