const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//Post model
const Post = require('../../models/Posts')

//Profile model
const Profile = require('../../models/Profile')

//post validation
const validatePostInputs = require('../../validation/post')

// @route GET api/posts/test
// @desc tests post route
// @acces public
router.get('/test', (req, res) => res.json({msg:"posts works"}))

// @route GET api/posts
// @desc GET all posts
// @acces public
router.get('/', (req, res) => {
  Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({noPostsFound:'No posts found'}))
})

// @route GET api/posts/:idPost
// @desc GET one post
// @acces public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({noPost:'No post found with that id'}))
})


// @route POST api/posts/posts
// @desc create post
// @acces private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = validatePostInputs(req.body)

  //Check Validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  })

  newPost.save().then(post => res.json(post))
})

// @route DELETE api/posts/:id
// @desc delete post
// @acces private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if(post.user.toString() !== req.user.id) {
              return res.status(401).json({ noAuthorized: 'User not authorized'})
            }
            //DELETE
            post.remove().then(() => res.json({ succes: true}))
          })
    .catch(err => res.status(404).json({postNotFound: 'Post not found'}))
    })
  })

// @route POST api/posts/like/:id
// @desc  like post
// @acces private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0 ) {
              return res.status(400).json({alreadyLike: 'User already liked this post'});
            }
            //Add user id to like array
            post.likes.unshift({user: req.user.id})

            post.save().then(post => res.json(post))
          })
    .catch(err => res.status(404).json({postNotFound: 'Post not found'}))
    })
  })

// @route POST api/posts/unlike/:id
// @desc  like post
// @acces private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
Profile.findOne({ user: req.user.id })
  .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0 ) {
            return res.status(400).json({notlike: 'You have not yet liked this post'});
          }
          //Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id)

          //Splice out of array
          post.likes.splice(removeIndex, 1)

          post.save().then(post => res.json(post))
        })
  .catch(err => res.status(404).json({postNotFound: 'Post not found'}))
  })
})

// @route POST api/posts/comment/:id
// @desc  add comment to post
// @acces private
router.post('/comment/:id', passport.authenticate('jwt', { session:false }), (req, res) => {
  const { errors, isValid } = validatePostInputs(req.body)

  //Check Validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }

      //Add to comments array
      post.comments.unshift(newComment)

      //Save comment
      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ postNotFound: 'No post found'}))

})

// @route DELETE api/posts/comment/:id/:comment_id
// @desc  Remove comment from post
// @acces private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session:false }), (req, res) => {

  Post.findById(req.params.id)
    .then(post => {
      //Check comment exist
      if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentNotExist:'Coment not exist'})
      }
      //Get remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.coment_id)

        //Splice comment out of array
      post.comments.splice(removeIndex, 1)

      //Save comment
      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ postNotFound: 'No post found'}))

})



module.exports = router;
