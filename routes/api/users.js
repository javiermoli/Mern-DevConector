const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

//Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Load user model
const User = require('../../models/User')
// @route GET api/users/test
// @desc tests users route
// @acces public
router.get('/test', (req, res) => res.json({msg:"users works"}))


// @route GET api/users/register
// @desc Rgister route
// @acces public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

//Check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }
  const email = req.body.email
  User.findOne({email}).then(user => {
    if(user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors)
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', //Size
        r: 'pg', //Rating
        d: 'mm' //Default
      });

      const newUser = new User({
        name:req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
       bcrypt.hash(newUser.password, salt, (err, hash) => {
         if (err) throw err;
         newUser.password = hash;
         newUser
           .save()
           .then(user => res.json(user))
           .catch(err => console.log(err));
        })
      })
    }
  })
})

// @route GET api/users/login
// @desc Login USer / Returning JWT token
// @acces public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)


//Check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email })
    .then(user => {
      //check for users
      if(!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors.email);
      }
      //check passwrod
      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if(isMatch) {
          //User Matched
      const payload = { id: user.id, name: user.name, avatar: user.avatar } // Create JWT payload

          //Sign Token
          jwt.sign(payload,
             keys.secretOrKey,
              { expiresIn: 3600 },
             (err, token) => {
              res.json({
                succes: true,
                token: 'Bearer ' + token
              })
          })

        } else {
          errors.password = 'Password incorrect'
          return res.status(400).json(errors.password)
        }
      })
    })
})

// @route GET api/users/current
// @desc  Return current user
// @acces Private

router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
  res.json({
    id:req.user.id,
    name:req.user.name,
    email:req.user.email,
    avatar:req.user.avatar
  })
})

module.exports = router;
