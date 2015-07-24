var express = require("express");
var http = require('http');
var fs = require('fs');
var cookieParser = require('cookie-parser');

var _ = require("./static/js/underscore.js");
var weixinApi = require("./weixinApi.js");
var dbservice = require("./dbservice.js");
var config = require("./config.js");


var app = express();

//定制模板引擎
app.use(cookieParser());
app.use( express.static('static/output') );

var cache = {};

app.engine('html', function ( filePath, options, callback ) {
    if(cache[filePath] && Date.now() - cache[filePath].expires < 1000 * 60 * 5){
        var rendered = _.template(cache[filePath].template, options);
        return callback(null, rendered);
    }

    fs.readFile(filePath, function (err, content) {
        cache[filePath] = cache[filePath]|| {};
        cache[filePath].template = content.toString();
        cache[filePath].expires = Date.now();

        if (err) return callback(new Error(err));
        var rendered = _.template(cache[filePath].template, options);
        return callback(null, rendered);
    });
});

var template = express();
template.set('views', './static/output/template'); // specify the views directory
template.set('view engine', 'html'); // register the template engine


template.get("/index", function(req, res){
    res.render('index', { name: 'Hey'});
});

app.all('/mobile/*', function( req, res, next ){
    try{
        var query = req.query;
        var paras;

        if( req.cookies.sessionid ){
            next();
        }else if( query && query.code ){
            weixinApi.getProfile( query.code, function( profile ){
                var str = JSON.stringify(profile);

                dbservice.addUser({user_json: str}, function(){
                    next();
                });
            });
        }else if( !req.cookies.sessionid ){
            var redirect_uri = encodeURIComponent("http://" + req.hostname + req.originalUrl);
            var URL_REDIRECT = config.AUTH_URL.replace("{uri}", redirect_uri);
            res.redirect( URL_REDIRECT );
        }
    }catch(e){
        console.log(e.message);
    }
}); 

app.use('/mobile', template); 
app.listen(80, function () {
    console.log('Fit App Ready');
})