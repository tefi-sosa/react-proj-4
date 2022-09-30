const sequelize = require('sequelize')
const {Post} = require('../models/post')
const {User} = require('../models/user')

module.exports = {
  getAllPosts: async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: {privateStatus: false},
            include: [{
                model: User,
                required: true,
                attributes: [`username`]
            }]
        })
        res.status(200).send(posts)
    } catch (error) {
        console.log('ERROR IN getAllPosts')
        console.log(error)
        res.sendStatus(400)
    }
  },

  getCurrentUserPosts: async (req, res) => {
    try {
        const {userId} = req.params
        const posts = await Post.findAll({
            where: {userId: userId},
            include: [{
                model: User,
                required: true,
                attributes: [`username`]
            }]})
        res.status(200).send(posts)
    } catch (error) {
        console.log('ERROR IN getCurrentUserPosts')
        console.log(error)
        res.sendStatus(400)
    }
  },

  addPost: async (req, res) => {
    console.log("hit addpost")
    try {
        const {title, content, status, userId} = req.body
        await Post.create({title, content, privateStatus: status, userId})
        res.sendStatus(200)
    } catch (error) {
        console.log('ERROR IN addPosts')
        console.log(error)
        res.sendStatus(400)
    }
  },

  editPost: (req, res) => {


      console.log('edit post')
  },

  deletePost: (req, res) => {
      console.log('delete post')
  }
}