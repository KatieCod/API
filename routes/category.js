var express = require('express');
var router = express.Router();
const getProductCategory = require('../data_manager/getProductCategory') 

router.get('/:name', async function(req, res, next) {
  const name = req.params.name
  const product = await getProductCategory(name)
  res.json(product)
})

module.exports = router;
