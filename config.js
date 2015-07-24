
var APP_ID = "wx2461e495cfc3bfb8";
var APP_SECRENT = "cb3cdce6d03a64b9cc63430ec94e7d43";
var TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+ APP_ID +"&secret=" + APP_SECRENT

var AUTH_URL = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + 
                   APP_ID + "&redirect_uri={uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";

var ACCESS_TOKEN_URL = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + APP_ID
                       +"&secret=" + APP_SECRENT + "&code={code}&grant_type=authorization_code";

var USER_INFO_URL = "https://api.weixin.qq.com/cgi-bin/user/info?access_token={accesstoken}&openid={openid}&lang=zh_CN";

var Config = {
    MYSQL_HOST: "123.57.146.114",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "Jiankang123",

    APP_ID: APP_ID,
    APP_SECRENT: APP_SECRENT,
    AUTH_URL: AUTH_URL,

    TOKEN_URL: TOKEN_URL,
    ACCESS_TOKEN_URL: ACCESS_TOKEN_URL,
    USER_INFO_URL: USER_INFO_URL
};

module.exports = Config;