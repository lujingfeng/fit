var express = require("express");
var http = require('http');
var app = express();
var fs = require('fs');
var _ = require("./static/js/underscore.js");

var weixinApi = require("./weixinApi.js");
var mysql = require("mysql");
var config = require("./config.js");


var connection = mysql.createConnection({
    host     : config.MYSQL_HOST,
    user     : config.MYSQL_USER,
    password : config.MYSQL_PASSWORD,
    database: "fit"
});

var availableStart = 18;
var availabelEnd = 36;
var timeline = [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

var api = (function(){
    
    return {
        fetchTrainer: function(callback){
            connection.query('SELECT * FROM fit.trainer', function(err, rows){

                if(err){
                    callback({
                        status: 500,
                        message: "Query fit.trainner error"
                    });
                }else{
                    rows = rows || [];

                    rows.forEach(function( item ){
                        if(!item.timeline){
                            item.timeline = _.extend([], timeline);
                        }
                    });

                    callback({
                        status: 0,
                        message: "Query success",
                        data: rows
                    });
                }
            });
        },

        checkTrainerAvailable: function(trainer){
            if(trainer.timeline.slice(availableStart, availabelEnd).indexOf(1) > -1){
                return true;
            }
            return false;
        },

        randomTrainer: function(callback){
            this.fetchTrainer(function(res){
                if(res.status === 0){
                    var trainerList = res.data ||[];
                    var avlist =  trainerList.reduce(function(pre, next){
                        var rtn = _.isArray(pre) ? pre : [];
                        if(api.checkTrainerAvailable(next)){
                            rtn.push(next);
                        }
                        return rtn;
                    }) || [];

                    var len = avlist.length;

                    if(len > 0){
                        callback({
                            status: 0,
                            data: avlist[ Math.floor(Math.random() * len)],
                            messenger: "OK"
                        });
                    }else{
                        callback({
                            status: 1,
                            messenger: "目前教练资源不够"
                        });
                    }
                }else{
                    callback({
                        status: res.status,
                        messenger: "error"
                    });
                }
            });
        },
        placeOrder: function(order, callback){
            connection.query('INSERT INTO fit.order SET ?', order, function(err, result){
                if(err){
                    callback({
                        status: 1,
                        message: "error occur"
                    });
                }else{
                    console.log(result);
                }
            });
        }
    }
})();

connection.connect(function(err){
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
     
    console.log('connected as id ' + connection.threadId);

    api.placeOrder({
        openid: "",
        order_id: Math.random()
    });
    
    api.randomTrainer(function( data ){
        
    });

    api.fetchTrainer(function( data ){

    });
});

//定制模板引擎
app.engine('html', function (filePath, options, callback) {
    fs.readFile(filePath, function (err, content) {
        if (err) return callback(new Error(err));
        var rendered = _.template(content.toString(), options);
        return callback(null, rendered);
    });
});

app.set('views', './static/output/template'); // specify the views directory
app.set('view engine', 'html'); // register the template engine

app.use(express.static('static/output'));
app.get("/index", function(req, res){
    res.render('index', { name: 'Hey'});

    weixinApi.token(function( data ){

    });
});

app.listen(3000, function () {
    console.log('App Ready');
})