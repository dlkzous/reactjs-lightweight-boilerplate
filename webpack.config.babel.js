import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  entry: './src/js/App.js',
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 8080
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'index.html',
        to: 'index.html'
      },
      {
        from: 'src/css/materialize/css/materialize.min.css',
        to: 'src/css/materialize/css/materialize.min.css'
      },
      {
        from: 'src/css/materialize/js/materialize.min.js',
        to: 'src/css/materialize/js/materialize.min.js'
      }
    ])
  ],
  eslint: {
    configFile: './.eslintrc'
  },
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        loaders: ['eslint']
      }
    ],
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            'es2015',
            'react'
          ]
        }
      }
    ]
  }
};
