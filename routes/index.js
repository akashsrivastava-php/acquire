var express = require('express');
var cors = require('cors')
var router = express.Router();
const users = require('./users')

router.use(cors())

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.use('/api/user/', users)

module.exports = router;
