const { VueLoaderPlugin } = require('vue-loader') 

module.exports = {
  entry : './src/app/main.js',
  output  : {
    path : __dirname + '/src/public/js',
    filename : 'bundle.js'
  },
  module : {
    rules : [
      {
        test : /\.js$/,
        exclude : /node_modules/,
        use : {
          loader : 'babel-loader'
          // ,
          // query: {
          //   presets:[ 'es2015', 'env', 'stage-2' ]
          // }
        }
      },
      {
        test : /\.vue$/,
        exclude : /node_modules/,
        use : {
          loader : 'vue-loader'
        }
      },
      {
        test: /\.css$/,
        exclude : /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins : [
    new VueLoaderPlugin()
  ]
}