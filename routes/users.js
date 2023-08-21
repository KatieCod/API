var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken'); 
const cookieParser = require('cookie-parser')

const getUser = require('../data_manager/getUser')
const getUsers = require('../data_manager/getUsers')
const loginUser = require('../data_manager/loginUser')
const registerUser = require('../data_manager/registerUser')

router.use(express.json())

const verifyUser = (req, res, next) => {
  const token = req.cookies.token
  if(!token){
    return res.json({failure: "You are guest"})
  } else {
    jwt.verify(token, "some-secret-key", (err, decoded) => {
      if (err){
        return {failure: "Token is not OK"}
      } else {
        req.dBanswer = decoded.dBanswer
        next()
      }
    })
  }
}

/* GET home page. */
router.get('/currentUser', verifyUser, (req, res) => {
  console.log('hahaha')
  res.json(req.dBanswer)
}) 

/* GET users listing. */
// router.get('/all', async function (req, res, next) {
//   try {
//     const users = await getUsers();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: "an error happened" })
//   }
// });

// router.get('/:id', async function (req, res, next) {
//   const id = req.params.id
//   const user = await getUser(id)
//   res.json(user)
// })

// router.post('/', async function (req, res, next) {
//   try {
//     const newUser = req.body;
//     console.log(newUser)
//     res.status(201).send("Apple");
//   } catch (error) {
//     res.status(500).json({ error: "an error happened" })
//   }
// });

router.post('/login', async function (req, res, next) {
  try {
    const loginAttempt = req.body
    const dBanswer = await loginUser(loginAttempt.email, loginAttempt.password)
    let answer = ''
    if (!dBanswer) {
      answer = { failure: "no such user" }
    } else {
      if (dBanswer.password == loginAttempt.password) {
        answer = {success: 'all cool'}
        console.log(dBanswer);
        const token = jwt.sign({ dBanswer }, "some-secret-key", { expiresIn: '1d' });
        res.cookie('token', token);
      } else {
        answer = { failure: "wrong password" }
      }
    }
    return res.status(201).json(answer)
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
    if (!dataBase) {
      answer = { failure: "User already exists" }
    } else {
      answer = dataBase
    }
    res.status(201).json(answer)
  } catch (error) {
    res.status(500).json({ error: "an error happened" })
  }
})

// const varifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if(!token) {
//     return res.json({error: 'you are not authenticated'});
//   } else {
//     jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
//       if(err) {
//         return {failure: 'token is not okay'};
//       } else {
//         console.log(req)
//         req.dBanswer=decoded.dBanswer;
//         next()
//       }
//     })
//   }
// }


