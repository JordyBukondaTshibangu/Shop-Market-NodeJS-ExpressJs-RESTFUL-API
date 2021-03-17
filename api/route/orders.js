const express = require('express')
const OrdersController = require('../controllers/order')
const checkAuth = require('../middleware/check-auth')
const router = express.Router()


router.get('/', checkAuth, OrdersController.orders_get_all)
router.post('/', checkAuth,OrdersController.order_create)
router.get('/:orderId', checkAuth,OrdersController.order_get_single)
router.delete('/:orderId', checkAuth,OrdersController.order_delete)

module.exports = router