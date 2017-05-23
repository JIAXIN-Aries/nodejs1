var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var usr=require('dao/Connect');
var moment = require('moment');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'smartCampus' });
});
router.post('/',function(req,res){
    client=usr.connect();
    var admin_id = req.body.admin_id;
    var admin_psd = req.body.admin_psd;
    usr.loginFun(client,admin_id, function (results) {
        if(results==''){
            res.locals.error = '用户不存在';
                  console.log(1);
            res.render('index', { title: 'smartCampus' });
            return;
        }else{
            if(results[0].admin_psd==admin_psd){
                res.locals.islogin=admin_id;
                res.cookie('islogin',res.locals.islogin,{maxAge:60000});
                res.redirect('success');
                return;
            }else{
                res.locals.error = '密码错误';
                res.render('index', { title: 'smartCampus' });
                return;
            }
        }
    });
});
router.get('/success', function(req, res, next) {
    res.send('成功登陆');
});
module.exports = router;
