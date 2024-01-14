var express = require('express');
var router = express.Router();
const getProducts = require('../data_manager/getProducts')
const getProduct = require('../data_manager/getProduct')
const addToCart = require('../data_manager/addToCart')
const getProductCategory = require('../data_manager/getProductCategory')
const addToWishList = require('../data_manager/addToWishList')
const removeFromWishList = require('../data_manager/removeFromWishList')
const getWishlist = require('../data_manager/getWishlist')
const addProduct = require('../data_manager/addProduct')
const changeProduct = require('../data_manager/changeProduct')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "an error happened" })
  }
});

router.post('/add-product', async function (req, res, next) {
  try {
    let { name, stock, unit_price, volume, expiration_date,
      origin_country, ingredients, ranking, brand, description,
      main_photo, featured, category } = req.body

    const dataBaseResponse = await addProduct(name,
      stock, unit_price, volume, expiration_date,
      origin_country, ingredients, ranking, brand,
      description, main_photo, featured, category);

    let answer = '';
    if (!dataBaseResponse) {
      answer = { failure: 'invalid request' }
    } else {
      answer = dataBaseResponse;
    }
    res.json(answer)

  } catch (error) {
    res.status(500).json({ error: 'an error occured1' })
  }
})

router.post('/change-product', async function (req, res, next) {
  try {
    let { id, name, stock, unit_price, volume, expiration_date,
      origin_country, ingredients, ranking, brand,
      description, main_photo,featured, category } = req.body

    const dataBaseResponse = await changeProduct(id, name, stock, unit_price,
      volume, expiration_date, origin_country, ingredients, ranking, brand,
      description, main_photo, featured, category);

    let answer = '';
    if (!dataBaseResponse) {
      answer = { failure: 'invalid request' }
    } else {
      answer = dataBaseResponse;
    }
    res.json(answer)

  } catch (error) {
    res.status(500).json({ error: 'an error occured1' })
  }
})

router.get('/wishlist', async function (req, res, next) {
  try {
    user_id = req.session.user.id
    const wishlist = await getWishlist(user_id);
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "an error happened" })
  }
});

router.post('/add-to-cart', async function (req, res, next) {
  try {
    let { id, name, unit_price, main_photo, quantity, user_id } = req.body
    if (!user_id) {
      user_id = req.session.user.id
    }
    const dataBaseResponse = await addToCart(id, name, unit_price, main_photo, quantity, user_id);
    let answer = '';
    if (!dataBaseResponse) {
      answer = { failure: 'invalid request' }
    } else {
      answer = dataBaseResponse;
    }
    res.json(answer)
  } catch (error) {
    res.status(500).json({ error: 'an error occured1' })
  }
})

router.get('/:id', async function (req, res, next) {
  const id = req.params.id
  const product = await getProduct(id)
  res.json(product)
})

router.get('/:name', async function (req, res, next) {
  const name = req.params.name
  const product = await getProductCategory(name)
  res.json(product)
})

router.post('/add-to-wishlist', async function (req, res, next) {
  try {
    let { id, name, unit_price, main_photo, quantity, user_id } = req.body
    if (!user_id) {
      user_id = req.session.user.id
    }
    const dataBaseResponse = await addToWishList(id, name, unit_price, main_photo, quantity, user_id);
    let answer = '';
    if (!dataBaseResponse) {
      answer = { failure: 'invalid request' }
    } else {
      answer = dataBaseResponse;
    }
    res.json(answer)
  } catch (error) {
    res.status(500).json({ error: 'an error occured1' })
  }
})

router.post('/remove-from-wishlist', async function (req, res, next) {
  try {
    let { product_id } = req.body

    const user_id = req.session.user.id

    const dataBaseResponse = await removeFromWishList(product_id, user_id);
    let answer = '';
    if (!dataBaseResponse) {
      answer = { failure: 'invalid request' }
    } else {
      answer = dataBaseResponse;
    }
    res.json(answer)
  } catch (error) {
    res.status(500).json({ error: 'an error occured1' })
  }
})

module.exports = router;
