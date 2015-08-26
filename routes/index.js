var express = require('express');
var router = express.Router();

var config = require('/config/config');
var shopify = require('shopify-api')();

shopify.setAuth(config.key,config.pwd);
shopify.setHost(config.host);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/customers', function(req, res, next){
  shopify.customer.count(function(err, data){
    shopify.customer.list(function(err, data){
      if (err){
        console.error(err);
        res.render('error', {})
      }
      else {
        console.log (data);
        res.render('customers', {title:"this is an awesome page title", customers:data.customers});
      }
    });
  });
});

module.exports = router;


console.log('routes completed...');