// webpack.config.js
module.exports = {
    // 入口文件
    entry: './index.js',

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
    },
}