/*
* 公共配置文件
* */

//引入path模块，用于解决路径问题
const path = require('path');
//使用html-webpack-plugin生成html
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //入口（从哪里进入开始解析）
  entry:'./src/js/index.js',

  //输出（最终加工完的代码输出到哪里）
  output: {// 输出配置
    path: path.resolve(__dirname, '../build'),//输出文件路径配置
    filename: './js/index.js',// 输出文件名
  },

  //所有的loader都要在如下的对象中注册
  module: {
    rules: [
      //使用file-loader处理图片(不做图片转base64可以采用)
      /*{
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',//如果不做图片转base64，可以用file-loader
            options: {
              outputPath:'img', //图片最终输出的位置
              publicPath:'../build/img',//css资源图片路径
              name:'[hash:5].[ext]'//修改图片名称
            },
          },
        ],
      },*/

      //使用url-loader处理图片(可以转base64)
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',//如果不做图片转base64，可以用file-loader
            options: {
              limit: 8192,//当图片小于8KB的时候，转base64
              outputPath:'img', //图片最终输出的位置
              publicPath:'../img',//css资源图片路径
              name:'[hash:5].[ext]' //修改图片名称
            }
          }
        ]
      },

      //使用jshint-loader进行语法检查
      {
        test: /.js/,
        enforce: 'pre',//预先加载好jshint-loader
        exclude: /node_modules/,//排除node_modules下的所有js文件
        use: [
          {
            loader: `jshint-loader`,
            options: {
              //jshint 的错误信息在默认情况下会显示为 warning（警告）类信息
              //将 emitErrors 参数设置为 true 可使错误显示为 error（错误）类信息
              emitErrors: true,

              //jshint 默认情况下不会打断webpack编译
              //如果你想在 jshint 出现错误时，立刻停止编译
              //请设置 failOnHint 参数为true
              failOnHint: false,
              esversion: 6
            }
          }
        ]
      },

      //使用json-loader解析json(为了不让语法检查报错)
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      //使用babel-loader转换语法
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
    ]
  },

  //所有插件在如下数组中声明且实例化
  plugins:[
    //提取html文件
    new HtmlWebpackPlugin({
        title:"webpack",//生成html文件title标签
        filename:"index.html",//生成html文件的名字
        template:"./src/index.html"//模板的位置
      }),
  ]
}

