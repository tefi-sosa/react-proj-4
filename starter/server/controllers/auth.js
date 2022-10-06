require('dotenv').config()
const {SECRET} = process.env
const {User} = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createToken = (username, id) => {
  return jwt.sign(
    {
      username,
      id
    },
    SECRET,
    { 
      expiresIn: '2 days' 
    }
  )
}

module.exports = {
  register: async (req, res) => {
    console.log("register")
    console.log(req.body)
    try {
      const {username, password} = req.body
      const foundUser =  await User.findOne({where: {username}})
      if (foundUser) {
        res.status(400).send('cannot create user')
      } else {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await User.create({username, hashedPass: hash})

        console.log("NEW USER")

        const token = createToken(newUser.dataValues.username, newUser.dataValues.id)
        console.log('TOOOOOOKEN', token)
        const exp = Date.now() + 1000 * 60 * 60 * 48
        res.status(200).send({
            username: newUser.dataValues.username,
            userId: newUser.dataValues.id,
            token,
            exp})
      }
    } catch (error) {
      console.log("ERROR in register")
      console.log(error)
    }
  },

  login: async (req, res) => {
    try {
      const {username, password} = req.body
      const foundUser =  await User.findOne({where: {username}})
      console.log("found user")
      if (foundUser) {
        const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)
        if (isAuthenticated) {
          const token = createToken(foundUser.dataValues.username, foundUser.dataValues.id)
          const exp = Date.now() + 1000 * 60 * 60 * 48
          res.status(200).send({
              username: foundUser.dataValues.username,
              userId: foundUser.dataValues.id,
              token,
              exp
          })
        } else {
          res.status(400).send('cannot log in')
        }
      } else {
        res.status(400).send('User does not exist')
      }
    } catch (error) {
      console.log("ERROR in login")
      console.log(error)
    }
  },
}