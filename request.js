var https = require("https");
var http = require('http');
var querystring = require('querystring');
var URL = require("url");

module.exports = {
    doRequest: function(url, method, data, callback){
        console.log("SEND REQUEST:" + url);

        var parseUrl = URL.parse(url);

        data = querystring.stringify(data);  

        var opt = {  
            method: method || "GET",  
            host: parseUrl.host,  
            port: parseUrl.port || 80,  
            path: parseUrl.path
        };  

        if( method == "POST" ){
            opt.headers = {  
                "Content-Type": 'application/x-www-form-urlencoded',  
                "Content-Length": data.length  
            };
        }else{
            opt.path = opt.path + '?' + data;
        }

        console.log("request optios=", opt, data);

        var requestMod = parseUrl.protocol == "https:" ? https : http;
      
        var req = requestMod.request(opt, function ( serverFeedback ) { 
            serverFeedback.setEncoding('utf8'); 
            if ( serverFeedback.statusCode == 200 ) {  
                var body = "";  
                serverFeedback.on('data', function (data) {
                    body += data;
                }).on('end', function() { 
                    
                    console.log("****************** response data ****************");
                    console.log(body);

                    callback && callback( {
                        status: serverFeedback.statusCode,
                        data: JSON.parse(body)
                    } );
                });  
            }  
            else {  
                console.log("************  Request Error *************", serverFeedback.statusCode);

                callback && callback({
                    status: serverFeedback.statusCode
                });
            }  
        });  

        if( method == "POST" ){
            req.write( data + "\n" );
        }
        req.end();
    },

    post: function(url, data, callback){
        if( typeof data == "function"){
            callback = data;
            data = {};
        }
        this.doRequest(url, "POST", data, callback);

    },

    get: function(url, data, callback){
        if( typeof data == "function"){
            callback = data;
            data = {};
        }
        this.doRequest(url, "GET", data, callback);
    }
};