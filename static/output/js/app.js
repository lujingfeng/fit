define('js/app.jsx', function(require, exports, module){ var ServiceList = React.createClass({displayName: "ServiceList",
    componentDidMount: function(){
        var root = this.refs.root.getDOMNode();
        var self = this;

        root = $(root);
        root.on("click", "li", function(e){
            var data = $(this).attr("data");

            if(data == 1){
                self.props.onSelectService();
            }
        });
    },
    render: function(){

        return (
            React.createElement("ul", {className: "service-list", ref: "root"}, 
                React.createElement("li", {className: "clearfix", data: 1}, 
                    React.createElement("div", {className: "name"}, 
                        React.createElement("p", null, "􏰎􏰀􏰔􏰕􏰖􏰗􏰖􏰎􏰀􏰔􏰕􏰖􏰗􏰖特惠瑜珈1对1"), 
                        React.createElement("span", null, "上门服务， 目前只对北京开发")
                    ), 
                    React.createElement("span", {className: "sec"}, "119元")
                ), 
                React.createElement("li", null, 
                    React.createElement("p", {className: "name"}, "中级瑜珈"), 
                    React.createElement("span", {className: "sec"}, "敬请期待")
                ), 
                React.createElement("li", null, 
                    React.createElement("p", {className: "name"}, "高级瑜珈"), 
                    React.createElement("span", {className: "sec"}, "敬请期待")
                )
            )
        )
    }
});


var DateSelector = React.createClass({displayName: "DateSelector",
    render: function(){

    }
});

var AdressInput = React.createClass({displayName: "AdressInput",
    render: function(){

    }
});

var ContactInput = React.createClass({displayName: "ContactInput",
    render: function(){
        
    }
});

var Detail = React.createClass({displayName: "Detail",
    render: function(){
        return (
            React.createElement("div", {className: "detail"}, 
                React.createElement("div", {className: "top"}, 
                    React.createElement("div", {className: "banner"}, 
                        React.createElement("img", {src: "http://img2.3lian.com/2014/f5/97/d/43.jpg"})
                    ), 
                    React.createElement("div", {className: "description"}, 
                        React.createElement("div", {className: "d1 clearfix"}, 
                            React.createElement("p", null, "特惠瑜珈1对1 119元"), 
                            React.createElement("span", null, "时长 60分钟")
                        ), 
                        React.createElement("s", null, "店面价 399元"), 
                        React.createElement("p", {className: "note"}, 
                           "BlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBla"
                        )
                    )
                ), 
                React.createElement("div", {className: "middle"}, 
                  React.createElement("ul", null, 
                    React.createElement("li", null, 
                      React.createElement("span", null, "预约时间"), 
                      React.createElement("span", {className: "arrow"}, ">")
                    ), 
                    React.createElement("li", null, 
                      React.createElement("span", null, "服务地址"), 
                      React.createElement("span", {className: "arrow"}, ">")
                    ), 
                    React.createElement("li", null, 
                      React.createElement("span", null, "联系方式"), 
                      React.createElement("span", {className: "arrow"}, ">")
                    )
                  )
                ), 
                React.createElement("div", {className: "trainer"}, 
                    React.createElement("div", null, 
                       React.createElement("span", null, "上门老师"), 
                       React.createElement("span", null, "江雪")
                    ), 
                    React.createElement("span", null, 
                       "老师简介:从事XXXXX"
                    )
                ), 

                React.createElement("div", {className: "place-order"}, 
                    React.createElement("button", null, "确认下单")
                )
            )
        )
    }
});


var PAGE_SERVICE_LIST = 1;
var PAGE_DETAIL = 2;

var App = React.createClass({displayName: "App",

    getInitialState: function() {
        return {
            pageType: PAGE_SERVICE_LIST
        };
    },

    componentDidMount: function(){
         
    },

    componentWillUnmount: function(){

    },

    onSelectService: function(){
        this.setState({
            pageType: PAGE_DETAIL
        });
    },
    
    render: function(){
        var view;
        if(this.state.pageType == PAGE_SERVICE_LIST){
            view = React.createElement(ServiceList, {onSelectService: this.onSelectService})
        }else {
            view = React.createElement(Detail, null)
        }

        return  (
            React.createElement("div", {id: "main"}, 
                view
            )
        )
    }
});

React.render(React.createElement(App, null), document.body);

module.exports = App; 
});