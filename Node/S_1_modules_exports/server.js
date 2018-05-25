//user = {User: function}
//Получаем экспортом объект и записываем в переменную
//У этого объекта есть св-во User, где лежит нужная нам ф-ция
var user = require('./user.js');

//Используем свойство полученного экспортом объекта. В этом свойстве - нужная нам ф-ция
var vasya = new user.User("Вася");
var petya = new user.User("Петя");

vasya.hello(petya);