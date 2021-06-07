var express = require("express");
var router = express.Router();
var models = require("../models");
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var authService = require("../services/auth")

router.get('/api', (req, res, next) => {
  models.users.findAll({
    where: { 
      UserId: { 
        [Op.gt]: 1 
      } 
    }
  })
  .then(users => {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(users))
  })
})

router.post('/api/signup', (req, res, next) => {
  models.users.findOrCreate({
    where: { Email: req.body.email },
    defaults: {
      FullName: req.body.name,
      Email: req.body.email,
      UserName: req.body.userName,
      Password: authService.hashPassword(req.body.password),
      Admin: 0
    }
  })
  .spread((result, created) => {
    if(created){
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ result: true, message: 'you have successfully signed up' }))
    } else {
      res.header('Content-Type', 'application/json')
      res.send({ result: false, message: 'user already exists' })
    }
  })
})

router.post('/api/login', (req, res, next) => {
  models.users.findOne({
    where: { Email: req.body.email },
    // attributes: ['FullName', 'UserName', 'UserId', 'Email', 'Admin']
  })
  .then(user => {
    if(!user){
      res.send(JSON.stringify({ result: false, message: 'user not found', user: null}))
    } else {
      let passwordMatch = authService.comparePassword(req.body.password, user.Password)
      if(passwordMatch){
        let token = authService.signUser(user)
        res.header('Content-Type', 'application/json')
        res.cookie('jwt', token)
        res.send(JSON.stringify({ result: true, message: 'Login successful', user: user}))
      } else {
        res.send(JSON.stringify({ result: false, message: 'incorrect password', user: null}))
      }
    }
  })
})

router.get('/api/profile', (req, res, next) => {
  let token = req.cookies.jwt
  console.log(token)
  if(token){
    authService.verifyUser(token)
    .then( user => {
      if(user){
        models.users.findOne({
          where: { Email: user.Email },
          attributes: ['UserId', 'FullName', 'UserName', 'Email']
        })
        .then( result => {
          res.header('Content-Type', 'application/json') 
          res.send(JSON.stringify({ result: true, data: result}))
        })
      } else {
        res.send(JSON.stringify({ result: false, message: 'must be logged in'}))
      }
    })
  } else {
    res.send(JSON.stringify({ result: false, message: 'must be logged in'}))
  }
})

router.get('/api/profile/:id', (req, res, next) => {
  let token = req.cookies.jwt
  if(token){
    authService.verifyUser(token)
    .then( user => {
      if(user.UserId === parseInt(req.params.id)){
        console.log('success')
        models.users.findOne({
          where: { Email: user.Email },
          attributes: ['UserId', 'FullName', 'UserName', 'Email']
        })
        .then( result => {
          res.header('Content-Type', 'application/json') 
          res.send(JSON.stringify({ result: true, data: result}))
        })
      } else {
        models.users.findOne({
          where: { UserId: parseInt(req.params.id) },
          attributes: ['UserId', 'FullName', 'UserName']
        })
        .then( user => {
          res.header('Content-Type', 'application/json') 
          res.send(JSON.stringify({ result: false, data: user}))
        })
      }
    })
  } else {
    models.users.findOne({
      where: { UserId: parseInt(req.params.id) },
      attributes: ['UserId', 'FullName', 'UserName']
    })
    .then( user => {
      res.header('Content-Type', 'application/json') 
      res.send(JSON.stringify({ result: false, data: user}))
    })
  }
})

router.get('/api/logout', (req, res, next) => {
  res.cookie('jwt', "", { expires: new Date(0) })
  res.send(JSON.stringify({ result: true, message: 'logged out'}))
})

router.delete('/api/:userId', (req, res, next) => {
  let token = req.cookies.jwt
  if(token){
    authService.verifyUser(token)
    .then( user => {
      if( user.UserId == req.params.userId || user.Admin == 1 ){
        let model = [models.users, models.posts, models.comments]
        let status = []
        for(let i=0; i<model.length; i++){
          model[i].destroy({
            where: { UserId: parseInt(req.params.userId) }
          })
          .then( result => {
            status.push(result)
          })
        }
        return status
      }
    })
    .then( status => {
      res.header('Content-Type', 'application/json') 
      res.send(JSON.stringify(status))
    })
  }
})

module.exports = router