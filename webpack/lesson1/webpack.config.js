'use strict';

const path = require('path');

module.exports = {
  //ускоряет сборку, работает через eval Без минификации
  mode: 'development',
  entry: './home', //какой модуль собирать, у нас home.html
  // entry: {
  //   peka: './home' //можно указать имя для проекта в entry, и потом использовать его для output
  // },
  output: {
    path: path.resolve(__dirname, 'build'),
    // publicPath: "/", //можно указать корень сервера - (эта директория = корень сервера)
    //переменные вебпака видны снаружи
    library: "home",
    //собирать в этот файл
    filename: 'build.js'
    // filename: '[name].js'
  },

  //смотреть за файлами. Если что-то изменится - вебпак сам перезапустит сборку
  watch: true

  //source maps
  // devtool: "source-map"
  // devtool: "eval-source-map"
}