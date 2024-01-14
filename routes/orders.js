var express = require('express');
var router = express.Router();
const addOrder = require('../data_manager/addOrder') 
const addOrderDetails = require('../data_manager/addOrderDetails') 
const getOrders = require('../data_manager/getOrders') 
const getOrderDetails = require('../data_manager/getOrderDetails') 

router.post('/add-order', async function (req, res, next) {
    try {
        const { user_id, order_date } = req.body
        const addOrders = await addOrder( user_id, order_date );
        res.json(addOrders)
    } catch (error) {
        res.status(500).json({error: 'an error occured'})
    }
})

router.post('/add-order-details', async function (req, res, next) {
    try {
        const { order_id, product_id, product_unit_price, quantity, total_price, product_photo, product_name } = req.body
        const addOrderDetail = await addOrderDetails( order_id, product_id, product_unit_price, quantity, total_price, product_photo, product_name );
        res.json(addOrderDetail)
    } catch (error) {
        res.status(500).json({error: 'an error occured'})
    }
})

router.get('/', async function (req, res, next) {
    const orderItems = await getOrders();
    res.json(orderItems)
})

router.get('/order-details', async function (req, res, next) {
    const orderDetails = await getOrderDetails();
    res.json(orderDetails)
})

module.exports = router;