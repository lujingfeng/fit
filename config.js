
var APPP_ID = "wxc656f0ee0023fc60";
var APP_SECRENT = "c526a24a39051e2f56b9c8c5cf4b3038";
var TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+ APPP_ID +"&secret=" + APP_SECRENT

var Config = {
    MYSQL_HOST: "123.57.146.114",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "Jiankang123",
    APP_ID: APPP_ID,
    APP_SECRENT: APP_SECRENT,

    TOKEN_URL: TOKEN_URL
};

module.exports = Config;