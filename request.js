var https = require("https");
var http = require('http');
var querystring = require('querystring');
var URL = require("url");

module.exports = {
    post: function(url, data, callback){
        console.log("SEND REQUEST:" + url);
        console.log( data );

        if( typeof data == "function"){
            callback = data;
            data = {};
        }

        var parseUrl = URL.parse(url);

        data = querystring.stringify(data);  

        var opt = {  
            method: "POST",  
            host: parseUrl.host,  
            port: parseUrl.port || 80,  
            path: parseUrl.path,  
            headers: {  
                "Content-Type": 'application/x-www-form-urlencoded',  
                "Content-Length": data.length  
            }  
        };  
      
        var req = http.request(opt, function ( serverFeedback ) {  
            if ( serverFeedback.statusCode == 200 ) {  
                var body = "";  
                serverFeedback.on('data', function (data) {
                    body += data;
                }).on('end', function() { 
                    
                    console.log("****************** req response data ****************");
                    console.log(body);

                    callback && callback( {
                        status: serverFeedback.statusCode,
                        data: JSON.parse(body)
                    } );
                });  
            }  
            else {  
                console.log("************ Post Request Error *************", serverFeedback.statusCode);

                callback && callback({
                    status: serverFeedback.statusCode
                });
            }  
        });  

        req.write( data + "\n" );  
        req.end();
    }
};