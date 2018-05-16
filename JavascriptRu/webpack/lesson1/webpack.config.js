'use strict';

module.exports = {
  //какой модуль собирать, у нас home.html
  mode: 'development',
  entry: './home',
  output: {
    // path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  }
}