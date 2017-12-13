const HtmlWebpackPlugin = require('html-webpack-plugin')

const { srcPath, indexJsPath, indexHtmlPath  } = require('./file.path.js')

// 生成HTML文件
const generateIndex = new HtmlWebpackPlugin({
    inject: 'body',
    filename: 'index.html',
    template: indexHtmlPath
})

module.exports = {
    // 基础目录（绝对路径），用于从配置中解析入口点和加载程序
    // 默认使用当前目录，但建议在配置中传递一个值。这使得您的配置独立于CWD（当前工作目录）
    context: srcPath,

    // 入口文件
    entry: indexJsPath,

    // 输入配置
    output: {
    },

    // 模块配置
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader'
            }
        ]
    }
}