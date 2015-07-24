var config = require("./config.js");
var requestify = require('requestify');

var API = {};


// 给定年月获取当月天数   
function GetMDay(y, m) { 
    var mday = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); 
    if ((y % 40 == 0 && y % 100 != 0) || y % 400 == 0)//判断是否是闰月 
        mday[1] = 29; 
    return mday[m - 1]; 
}   

// 获取星期数 

function WeekNumber(y, m, d) { 
    var wk; 
    if (m <= 12 && m >= 1) { 
        for (var i = 1; i < m; ++i) { 
            d += GetMDay(y, i); 
        } 
    } 
    /*根据日期计算星期的公式*/
    wk = (y - 1 + (y - 1) / 4 - (y - 1) / 100 + (y - 1) / 400 + d) % 7; 
    //0对应星期天，1对应星期一 
    return parseInt(wk); 
} 

API.access_token = null;
API.access_token_expires = 0;

API.token = function( callback ){
    if(API.access_token && API.access_token_expires - Date.now() > 0){
        return callback( API.access_token );
    }

    requestify.get( config.TOKEN_URL ).then( function( response ) {
        if( response.getCode() == 200 ){
            var content = response.getBody();
            API.access_token = content.access_token;
            API.access_token_expires = Date.now() + 1000 * 60 * 60 * 1.5;

            callback && callback( content.access_token );
        }else{
            callback && callback( '' );
        }
    });
};

API.getProfile = function( code ){
    var ACCESS_TOKEN_URL = config.ACCESS_TOKEN_URL.replace("{code}", code);
    requestify.get( ACCESS_TOKEN_URL ).then( function( response ) {
        if( response.getCode() == 200 ){
            var content = response.getBody();
            console.log(content);

            callback && callback(  );
        }else{
            callback && callback( '' );
        }
    });
};

API.__profileByOpenId = function( openid ){
    API.token(function( token ){
        var USER_INFO_URL = config.USER_INFO_URL.replace("{accesstoken}", token).replace("{openid}", openid);
        requestify.get( USER_INFO_URL ).then( function( response ) {
            if( response.getCode() == 200 ){
                var content = response.getBody();

                console.log("-------content----");
                console.log(content);

                callback && callback(  );
            }else{
                callback && callback( '' );
            }
        });
    });
};

module.exports = API;