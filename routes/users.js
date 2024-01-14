var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const getUser = require('../data_manager/getUser')
const getUsers = require('../data_manager/getUsers')
const loginUser = require('../data_manager/loginUser')
const registerUser = require('../data_manager/registerUser')
const checkUserID = require('../data_manager/checkUserID');
const changePassword = require('../data_manager/changePassword');
const { link } = require('.');

const secret = JWT_SECRET = 'hey there secret!'

router.use(express.json())

// const verifyUser = (req, res, next) => {
//   const name = req.session.first_name
//   if (!name) {
//     return res.json({ failure: "You are guest" })
//   } else {
//     jwt.verify(token, "some-secret-key", (err, decoded) => {
//       if (err) {
//         return { failure: "Token is not OK" }
//       } else {
//         req.user = decoded.user
//         next()
//       }
//     })
//   }
// }

router.get('/currentUser', (req, res) => { // removed middlewear verifyUser
  if (req.session.authorized) {
    const currentUser = req.session.user
    res.json(currentUser)
  }
})

/* GET users listing. */
router.get('/all', async function (req, res, next) {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "an error happened" })
  }
});

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
    console.log(loginAttempt)
    const user = await loginUser(loginAttempt.email)
    let answer = ''
    if (!user) {
      answer = { failure: "no such user" }
    } else {
      if (user.password == loginAttempt.password) {
        req.session.user = user;
        req.session.authorized = true;
        answer = { success: 'all cool' }
      } else {
        answer = { failure: "wrong password" }
      }
    }
    return res.status(201).json(answer)
  } catch (error) {
    res.status(500).json({ error: "an error happened" })
  }
})

router.post('/register', async function (req, res, next) {
  try {
    const registerAttempt = req.body
    const dataBase = await registerUser(registerAttempt.email, registerAttempt.password, registerAttempt.first_name, registerAttempt.last_name, registerAttempt.phone)
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

router.get('/logout', (req, res) => {
  req.session.destroy();
  return res.json({ status: 'success' })
})

router.post('/forgot-password', async function (req, res, next) {
  try {
    const { email } = req.body;
    const user = await loginUser(email);
    let answer = '';
    if (!user) {
      answer = { failure: "no such user" }
    } else {
      const secretWord = secret + user.password;
      const token = jwt.sign({ user }, secretWord, { expiresIn: '1d' })
      const link = `http://localhost:3000/reset_success${user.id}/${token}`
      answer = {link: link, id: user.id, token: token};
    }
    res.status(201).json(answer)
  } catch (error) {
    res.status(500).json({ error: "an error happened" })
  }
})

router.post('/resest-password/:id/:token', async function (req, res, next) {
  const { id, token } = req.params;
  const { password } = req.body;
  const user = await checkUserID(id);
  let answer = '';;
  if (!user) {
    answer = { failure: "invalid ID" }
  } else {
    const secretWord = secret + user.password;
    try {
      jwt.verify(token, secretWord, (err, decoded) => {
        if (err) {
          return { failure: "verification is not fine" }
        } else {
          const payload = decoded;
          changePassword(password, payload.user.email)
          answer = payload.user.email
        }
      })
      res.status(201).json(answer)
    } catch (err) {
      console.log(err)
    }
  }
})

module.exports = router;