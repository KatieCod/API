var express = require('express');
var router = express.Router();

const getUser = require('../data_manager/getUser')
const getUsers = require('../data_manager/getUsers')
const loginUser = require('../data_manager/loginUser')
const registerUser = require('../data_manager/registerUser')

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

router.post('/', async function (req, res, next) {
  try {
    const newUser = req.body; 
    console.log(newUser)
    res.status(201).send("Apple");
  } catch (error) {
    res.status(500).json({ error: "an error happened" })
  }
});

router.post('/login', async function (req, res, next) {
  try {
    const loginAttempt = req.body
    console.log(loginAttempt)
    const dBanswer = await loginUser(loginAttempt.email, loginAttempt.password)
    console.log(dBanswer)
    let answer = ''
    if (!dBanswer){
      answer = {failure: "no such user"}
    } else {
      dBanswer.password == loginAttempt.password ? answer = dBanswer : answer = {failure: "wrong password"}
    }
    res.status(201).json(answer)
  } catch (error) {
    res.status(500).json({ error: "an error happened" })
  }
})

module.exports = router;

router.post('/register', async function (req, res, next) {
  try {
    const registerAttempt = req.body
    const dataBase = await registerUser(registerAttempt.email, registerAttempt.password, registerAttempt.first_name, registerAttempt.last_name, registerAttempt.phone)
    console.log(dataBase)
    let answer = ''
    if (!dataBase){
      answer = {failure: "User already exists"}
    } else {
      answer = dataBase
    }
    res.status(201).json(answer)
  } catch (error) {
    res.status(500).json({ error: "an error happened" })
  }
})
