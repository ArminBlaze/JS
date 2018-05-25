function User (name) {
	this.name = name;
}

User.prototype.hello = function(who) {
	console.log("Hello, " + who.name);
}

console.log("user.js is required!");

//Все функции и переменные тут - локальные для этого файла. 
//Этот файл называется модулем
//Чтобы экспортировать переменные и функции в другой модуль можно действовать по разному

//теперь мы сделали ф-цию User глобальной для всех модулей, куда подключен этот
//global.User это тоже самое, как и window.User - т.е. глобальная переменная
global.User = User;