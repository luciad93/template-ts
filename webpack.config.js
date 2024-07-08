const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
     index: './src/index.ts',
    animate: './src/animate.ts'
  } ,
  devtool: 'source-map',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
    title: 'GE Template ts',
    template: path.join(process.cwd(), 'src/index.html'),
    filename: 'index.html',
    chunks: ['index'],
    inject: 'body',
  }), 
  new HtmlWebpackPlugin({
    title: 'GE Template ts',
    template: path.join(process.cwd(), 'src/animation.html'),
    filename: 'animation.html',
    chunks: ['animate'],
    inject: 'body',
  })
],
  devServer: {
    host: '0.0.0.0',
    port: '1234',
  }
};
