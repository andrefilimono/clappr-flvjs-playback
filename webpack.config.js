const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const version = JSON.stringify(require('./package.json').version)

const pluginName = 'clappr-flvjs-playback'
const pluginLibrary = 'FLVJSPlayback'

let outputFile = ''
let plugins = [
  new webpack.DefinePlugin({
    VERSION: version
  })
]

if (process.env.npm_lifecycle_event === 'release') {
  outputFile = `${pluginName}.min.js`
  plugins.push(
    new UglifyJsPlugin({
      sourceMap: true
    })
  )
} else {
  outputFile = `${pluginName}.js`
}

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile,
    library: pluginLibrary,
    libraryTarget: 'umd'
  },
  externals: {
    clappr: {
      amd: 'clappr',
      commonjs: 'clappr',
      commonjs2: 'clappr',
      root: 'Clappr'
    }
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js']
  },
  devtool: 'source-maps',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    disableHostCheck: true,
    compress: true,
    host: '0.0.0.0',
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['add-module-exports']
          }
        }
      }
    ]
  }
}
