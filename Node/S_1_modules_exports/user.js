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

//Мы записали в объект exports свойство User - функцию User
//Т.е. наружу экспортируем только одну функцию
exports.User = User;