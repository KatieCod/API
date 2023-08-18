var express = require('express');
var router = express.Router();

const getUser = require('../data_manager/getUser')
const getUsers = require('../data_manager/getUsers')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({error: "an error happened"})
  }
});

router.get('/:id', async function(req, res, next) {
  const id = req.params.id
  const user = await getUser(id) 
  res.json(user)
})

module.exports = router;
