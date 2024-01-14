var express = require('express');
var router = express.Router();
const getCartItems = require('../data_manager/getCartItems')
const removeFromCart = require('../data_manager/removeFromCart')
const decreaseQunatity = require('../data_manager/decreaseQunatity')
const clearCart = require('../data_manager/clearCart')

router.post('/remove-from-cart', async function (req, res, next) {
    try {
        const { id } = req.body
        const user_id = req.session.user.id
        const removeItem = await removeFromCart(id, user_id);
        res.json(removeItem)
    } catch (error) {
        res.status(500).json({ error: 'an error occured' })
    }
})

router.get('/clear-cart', async function (req, res, next) {
    const clearTheCart = await clearCart();
    res.json(clearTheCart)

})

router.post('/decrease-quantity', async function (req, res, next) {
    try {
        const { id } = req.body
        const answer = await decreaseQunatity(id);
        res.json(answer)
    } catch (error) {
        res.status(500).json({ error: 'an error occured' })
    }
})


router.get('/', async function (req, res, next) {
    if (req.session.authorized) {
        const userId = req.session.user.id
        const cartItems = await getCartItems(userId);
        res.json(cartItems)
      }
})



module.exports = router;