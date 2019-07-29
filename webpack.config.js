const path = require('path');

module.exports = {
    entry: ['./src/Code03.ts'],
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    output: {
      filename: 'Code03.js',
      path: path.resolve(__dirname, 'assets')
    }
  };