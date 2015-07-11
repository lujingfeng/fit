var ServiceList = React.createClass({
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
            <ul className="service-list" ref="root">
                <li className="clearfix" data={1}>
                    <div className="name">
                        <p>􏰎􏰀􏰔􏰕􏰖􏰗􏰖􏰎􏰀􏰔􏰕􏰖􏰗􏰖特惠瑜珈1对1</p>
                        <span>上门服务， 目前只对北京开发</span>
                    </div>
                    <span className="sec">119元</span>
                </li>
                <li>
                    <p className="name">中级瑜珈</p>
                    <span className="sec">敬请期待</span>
                </li>
                <li>
                    <p className="name">高级瑜珈</p>
                    <span className="sec">敬请期待</span>
                </li>
            </ul>
        )
    }
});


var DateSelector = React.createClass({
    render: function(){

    }
});

var AdressInput = React.createClass(function(){
    render: function(){

    }
});

var ContactInput = React.createClass(function(){
    render: function(){
        
    }
});

var Detail = React.createClass({
    render: function(){
        return (
            <div className="detail">
                <div className="top">
                    <div className="banner">
                        <img src="http://img2.3lian.com/2014/f5/97/d/43.jpg"></img>
                    </div>
                    <div className="description">
                        <div className="d1 clearfix">
                            <p>特惠瑜珈1对1 119元</p>
                            <span>时长 60分钟</span>
                        </div>
                        <s>店面价 399元</s>
                        <p className="note">
                           BlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBla
                        </p>
                    </div>
                </div>
                <div className="middle">
                  <ul>
                    <li>
                      <span>预约时间</span>
                      <span className="arrow">&#62;</span>
                    </li>
                    <li>
                      <span>服务地址</span>
                      <span className="arrow">&#62;</span>
                    </li>
                    <li>
                      <span>联系方式</span>
                      <span className="arrow">&#62;</span>
                    </li>
                  </ul>
                </div>
                <div className="trainer">
                    <div>
                       <span>上门老师</span>
                       <span>江雪</span>
                    </div>
                    <span>
                       老师简介:从事XXXXX
                    </span>
                </div>

                <div className="place-order">
                    <button>确认下单</button>
                </div>
            </div>
        )
    }
});


var PAGE_SERVICE_LIST = 1;
var PAGE_DETAIL = 2;

var App = React.createClass({

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
            view = <ServiceList onSelectService={this.onSelectService}/>
        }else {
            view = <Detail/>
        }

        return  (
            <div id="main">
                {view}
            </div>
        )
    }
});

React.render(<App/>, document.body);

module.exports = App;