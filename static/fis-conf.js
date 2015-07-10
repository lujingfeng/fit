var PROJECT_NAME = 'phoenix';

fis.config.merge({
    projectname: PROJECT_NAME,

    project: {
    },

    roadmap: {
        domain: ['']
    },

    modules : {
        // 自动css sprites插件
        spriter: 'csssprites',
        parser : {
            //utc：underscore自带模板语言
            tmpl: 'utc',
            //less：css方言
            less: 'less',
            scss: 'sass',
            jsx:  'react'
        },
        postprocessor : {
            js : 'jswrapper, require-async'
        },
        postpackager : ['simple', 'autoload']
    },

    settings : {
        // optimizer : {
        //     'png-compressor' : {
        //         type : 'pngquant' //default is pngcrush
        //     }
        // },
        postprocessor : {
            jswrapper : {
                type : 'amd'
            }
        },
        postpackager : {
            //用于配合amd规范进行require文件的自动合并
            autoload: {
                //使用静态资源地图，便于支持require.async进行异步组件加载
                useSiteMap: false,
                useInlineMap: false,
                //资源资源地图放置位置
                subpath : 'static/pkg/asyncmap.js',
                //自动加载script依赖的占位标识符
                scriptTag: '<!-- SCIRPT_AUTOLOAD -->',
                //自动加载css依赖的占位标识符
                styleTag: '<!-- STYLE_AUTOLOAD -->',
                //资源表占位标识符
                resourceMapTag: '<!-- MAP_AUTOLOAD -->'
            },
            //用于进行零散文件依据pack配置进行打包替换
            simple: {
                //不开启自动的零散资源合并
                //所有资源严格进行手动整合
                autoCombine: false
            }
        },
        spriter: {
            csssprites: {
                margin: 30
            }
        },
    }
});

fis.config.merge({
    deploy: {
        lujingfeng : [{
            receiver: 'http://123.57.146.114:8999/receiver',
            //从产出的结果的static目录下找文件
            from : '/',
            //保存到远端机器
            to : '/home/fit'
        }],

        online: [{
            from : '/resource',
            //保存到远端机器
            to : './output/webroot'
        }, {
            from : '/template',
            //保存到远端机器
            to : './output/djangosite/templates',
            replace : {
                from : '{{{path}}}',
                to : 'template/' + PROJECT_NAME
            }
        }]
    },
    roadmap : {
        ext : {
            //less输出为css文件
            less : 'css',
            scss: 'css',
            jsx: 'js'
        }
    }
});
//设置jshint插件要排除检查的文件，默认不检查lib、jquery、backbone、underscore等文件
//使用spmx release命令时，添加--lint或-l参数即可生效
//fis.config.set('settings.lint.jshint.ignored', [ 'lib/**', /jquery|backbone|underscore/i ]);

//打包配置
//fis.config.set('pack', {});

fis.config.set('roadmap.path', [
    {
        reg : /(output\/.*|fis-conf\.js)/,
        release : false
    }, {
        reg : /^\/(js)\/(?!mod|jquery|underscore|react).*\.(js|jsx)$/,
        isMod : true,
        release: '/$&'
    }
]);