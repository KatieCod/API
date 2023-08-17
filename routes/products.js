var express = require('express');
var router = express.Router();
const getProducts = require('../getProducts') 
const getProduct = require('../getProduct') 

let theProducts;

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({error: "an error happened"})
  }
});

router.get('/:id', async function(req, res, next) {
  const id = req.params.id
  const product = await getProduct(id)
  res.send(product)
})

module.exports = router;
