var express = require('express');
var router = express.Router();
const User = require('../usersModel')
const Task = require('../taskModel')
const { generateAccessToken, authenticateToken } = require('../utils')

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res) {
  const { name, email, password } = req.body
  User.create({ name, email, password })
      .then(result => {
        const token = generateAccessToken({username: result.name})
        res.json({token, user: result, status: true})
      })
      .catch(err => {
        res.status(401).json({err, status: false})
      });
});

router.post('/login', function(req, res) {
  const { email, password } = req.body
  User.findOne({where: {
    email, password
  }})
  .then(result => {
    const token = generateAccessToken({username: result.name})
    res.json({token, user: result, status: true})
  })
  .catch(err => {
    res.json({err: "Invalid Credentials!", status: false})
  });
});

router.post('/addtask', authenticateToken, (req, res)=>{
  const { title, user_id, status } = req.body
  Task.create({ title, user_id, status })
  .then(result=>{
    res.json({ data: result, status: true })
  })
  .catch(err => {
    res.json({err: "Someting went wrong!", status: false})
  });
})

router.post('/getalltask', authenticateToken, function(req, res){
  const { user_id } = req.body
  Task.findAll({where:{
    user_id
  }})
  .then(response=>res.json(response))
  .catch(err=>console.log('err', err));
});

router.post('/changestatus', authenticateToken, function(req, res){
  const { id, status } = req.body
  Task.update({ status }, {
    where: {
      id
    }
  })
  .then(response=>res.json(response))
  .catch(err=>console.log('err', err));
});

router.post('/edittask', authenticateToken, function(req, res){
  const { id, user_id } = req.body
  Task.findOne({where:{
    id, user_id
  }})
  .then(response=>res.json(response))
  .catch(err=>console.log('err', err));
});

router.post('/updatetask', authenticateToken, function(req, res){
  const { id, user_id, title } = req.body
  Task.update({ title }, {
    where: {
      id, user_id
    }
  })
  .then(response=>res.json(response))
  .catch(err=>console.log('err', err));
});

router.post('/delete', authenticateToken, function(req, res){
  const { id, user_id } = req.body
  Task.destroy({where:{
    id, user_id
  }})
  .then(response=>res.json(response))
  .catch(err=>console.log('err', err));
});


router.post('/getuser', authenticateToken, function(req, res){
  const { id } = req.body
  User.findOne({where:{
    id
  }})
  .then(response=>res.json(response))
  .catch(err=>console.log('err', err));
});

router.post('/updateuser', authenticateToken, function(req, res){
  const { name, id, email, password } = req.body
  const data = { name, email }
  if(password!=null){
    data.password = password
  }
  User.update(data, {
    where: {
      id
    }
  })
  .then(response=>res.json(response))
  .catch(err=>console.log('err', err));
});

module.exports = router;
