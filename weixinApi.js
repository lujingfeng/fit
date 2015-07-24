var config = require("./config.js");
var https = require("https");
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

API.tokenData = null;

API.token = function( callback ){
    requestify.get(config.TOKEN_URL).then(function(response) {
        // Get the response body 
        console.log(response.getBody());
    });
};

module.exports = API;