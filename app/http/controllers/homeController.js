const Menu = require('../../models/menu')

function homeController() {
	return {
		async index(req, res, next) {
			const pizzas = await Menu.find()
			res.render('home', { pizzas: pizzas })
			next()
		},
	}
}

module.exports = homeController
