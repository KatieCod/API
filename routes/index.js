var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken'); 


/* GET home page. */
router.get('/', (req, res) => {
  return res.send('hi, i am index')
}) 

module.exports = router;
