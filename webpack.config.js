const path = require('path')
const webpack = require('webpack')
const version = JSON.stringify(require('./package.json').version)
const clapprCoreVersion = JSON.stringify(require('@clappr/core/package.json').version)

const pluginName = 'clappr-flvjs-playback'
const pluginLibrary = 'FLVJSPlayback'

const config = {
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: pluginLibrary,
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  externals: {
    '@clappr/core': '@clappr/core',
    'flv.js': 'flvjs'
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: version,
      CLAPPR_CORE_VERSION: clapprCoreVersion
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}

module.exports = (_, { mode }) => {
  if (mode === 'production') {
    config.output.filename = `${pluginName}.min.js`
  } else {
    config.output.filename = `${pluginName}.js`
  }

  return config
}
