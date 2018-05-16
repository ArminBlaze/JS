//global.User = User
require('./user.js');

//используем ф-цию User, как будто она объявлена в этом модуле. Т.к. она записана в объект global
var vasya = new User("Вася");
var petya = new User("Петя");

vasya.hello(petya);