var express = require('express');
var router = express.Router();
const addReview = require('../data_manager/addReview') 
const getReviews = require('../data_manager/getReviews') 
const approveReview = require('../data_manager/approveReview') 

router.post('/add-review', async function (req, res, next) {
    try {
        const { text, user_id, user_name, ranking, product_id, approved, date, product_name, product_photo } = req.body
        const addOrders = await addReview( text, user_id, user_name, ranking, product_id, approved, date, product_name, product_photo);
        res.json(addOrders)
    } catch (error) {
        res.status(500).json({error: 'an error occured'})
    }
})

router.post('/approve-review', async function (req, res, next) {
    try {
        const { approved, id } = req.body
        const approvedReview = await approveReview(approved, id);
        res.json(approvedReview)
    } catch (error) {
        res.status(500).json({error: 'an error occured'})
    }
})

router.get('/', async function (req, res, next) {
    const reviews = await getReviews();
    res.json(reviews)
})

module.exports = router;