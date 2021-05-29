var express = require("express");
var router = express.Router();
var models = require("../models");
var authService = require("../services/auth")

router.get('/api/:postId', (req, res, next) => {
  models.comments.findAll({
    where: { PostId: req.params.postId }
  })
  .then( comments => {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(comments))
  })
})

router.post('/api', (req, res, next) => {
  models.comments.findOrCreate({
    where: { CommentId: 0 },
    defaults: {
      PostId: req.body.postId,
      UserId: req.body.userId,
      CommentBody: req.body.body,
      Likes: 0,
      Dislikes: 0
    }
  })
  .spread((result, created) => {
    if(created){
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify(result))
    } else {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ result: false, message: 'Something Went Wrong' }))
    }
  })
})

router.delete('/api/:commentId', (req, res, next) => {
  models.comments.destroy({
    where: { CommentId: req.params.commentId}
  })
  .then( result => {
    if(result){
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ status: true, message: 'comment was deleted' }))
    } else {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ status: false, message: 'something whent worng' }))
    }
  })
})

router.put('/api/addlike/:commentId', (req, res, next) => {
  let where = {where: { CommentId: parseInt(req.params.commentId) }}
  let values = {Likes: parseInt(req.body.likes + 1)}

  models.comments.update(values, where)
  .then(() => {
    return models.comments.findOne({
      where: { CommentId: parseInt(req.params.commentId)}
    })
  })
  .then( comment => {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(comment))
  })
})

router.put('/api/adddislike/:commentId', (req, res, next) => {
  let values = {Dislikes: parseInt(req.body.dislikes + 1)}
  let selectors = {
    where: { CommentId: parseInt(req.params.commentId) }
  }

  models.comments.update(values, selectors)
  .then( () => { 
    return models.comments.findOne({ 
      where: { CommentId: req.params.commentId } 
    })
  })
  .then( comment => {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(comment))
  })
})

module.exports = router