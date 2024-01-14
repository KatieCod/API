var express = require('express');
var router = express.Router();
const getProductSkinType = require('../data_manager/getProductSkinType') 

router.get('/:name', async function(req, res, next) {
  const name = req.params.name
  const product = await getProductSkinType(name)
  res.json(product)
})

module.exports = router;
