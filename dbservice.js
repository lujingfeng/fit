var mysql = require("mysql");
var config = require("./config.js");
var _ = require("./static/js/underscore.js");

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
                    var avlist =  trainerList.length>0?trainerList.reduce(function(pre, next){
                        var rtn = _.isArray(pre) ? pre : [];
                        if(api.checkTrainerAvailable(next)){
                            rtn.push(next);
                        }
                        return rtn;
                    }) : [];

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
                    callback({
                        status: 0,
                        data: order,
                        message: "error occur"
                    });
                }
            });
        },

        addUser: function(user, callback){
            connection.query('INSERT INTO fit.user SET ?', user, function(err, result){
                console.log("fit.user", result, err);
                if(err){
                    callback({
                        status: 1,
                        message: "error occur"
                    });
                }else{
                    user.id = result.insertId;
                    callback({
                        status: 0,
                        data: user,
                        message: "error occur"
                    });
                }
            });
        },

        createSessionForUser: function( userinfo , callback){
            if(typeof userinfo == "undefined"){
                return;
            }
            var sessionid = Date.now();
            var paras = {
                sessionid: sessionid,
                createtime: Date.now(),
                userid: userinfo.id,
                openid: userinfo.openid
            };
            connection.query('INSERT INTO fit.session SET ?', paras , function(err, result){
                console.log('fit.session', result, err);
                if(err){
                    callback({
                        status: 1,
                        message: "error occur"
                    });
                }else{
                    paras.id = result.insertId;
                    callback({
                        status: 0,
                        data: paras,
                        message: "error occur"
                    });
                }
            });
        }
    }
})();

connection.connect(function(err){
    if (err) {
        console.error('error mysql connection: ' + err.stack);
        return;
    }
     
    console.log('connected as id ' + connection.threadId);

    api.placeOrder({
        openid: "",
        order_id: Math.random()
    }, function(){});
    
    api.randomTrainer(function( data ){
        
    });

    api.fetchTrainer(function( data ){

    });
});


module.exports = api;