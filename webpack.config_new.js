//webpack node 

const path = require('path')
// console.log(path.resolve())
// console.log(__dirname)

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader')
const esbuild = require('esbuild')

module.exports = {
    mode:'development', //模式

    devServer: {   //自动会找你执行目录下的index.html
        port:8000,
        progress:true,
        contentBase: './dist',
        compress:true
    },
    entry: './src/index.js', //指定打包的入口文件
    output:{
        filename: 'index.js', // 指定打包后的文件名， 默认为main.js
        path: path.resolve(__dirname, 'dist'),  // 打包后输出的路径
    },
    plugins: [ // 数组 存放所以的webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html', //指定打包的路径
            filename: 'index.html' , //打包后文件的名字
            
            hash:true
        }),
        new MiniCssExtractPlugin({ //抽离css
            filename: 'main.css'
        })
    ],
    optimization: {
        minimizer: [
            new ESBuildMinifyPlugin({
                target: 'es2015'  // Syntax to compile to (see options below for possible values)
            })
        ]
    },
    module: { //配置模块
        //loader
        rules:[{ //规则  css-loader
            test:/\.css$/, 
            use:[
                MiniCssExtractPlugin.loader, // 把内容放到link标签中
                'css-loader',
                {
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'css',
                        minify: true
                    }
                }
            ]},
            {//css打包到js中
                test: /\.scss/,
                use: [{
                    loader: MiniCssExtractPlugin.loader // css-style 代表放在 html中
                }, {
                    loader: 'css-loader'
                }, 
                {
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'css',
                        minify: true
                    }
                },
                {
                    loader: 'sass-loader'
                } 
            ]
            },
            {
                test: /\.js$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'jsx',  // Remove this if you're not using JSX
                    target: 'es2015',  // Syntax to compile to (see options below for possible values)
                    // css: true,
                    implementation: esbuild
                }
            }      
        ]
    }
}



