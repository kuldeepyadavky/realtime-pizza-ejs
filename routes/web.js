const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customer/cartController');
const orderController = require('../app/http/controllers/customer/orderController');
const adminOrderController = require('../app/http/controllers/admin/orderController');
const statusController = require('../app/http/controllers/admin/statusController');
const auth = require('../app/http/middlewares/auth');
const admin = require('../app/http/middlewares/admin');
const guest = require('../app/http/middlewares/guest');

function initRoutes(app) {
	app.get('/', homeController().index);

	app.get('/login', guest, authController().login);
	app.post('/login', authController().postLogin);
	app.get('/register', guest, authController().register);
	app.post('/register', authController().postRegister);
	app.post('/logout', authController().logout);

	app.get('/cart', cartController().index);
	app.post('/update-cart', cartController().update);
	app.post('/orders', orderController().store);
	app.get('/customer/orders', auth, orderController().index);
	app.get('/customer/orders/:id', auth, orderController().show);
	app.post('/admin/order/status', admin, statusController().update);
	app.get('/admin/orders', admin, adminOrderController().index);
}

module.exports = initRoutes;
