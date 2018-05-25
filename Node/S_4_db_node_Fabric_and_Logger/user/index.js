var db = require('db');
var log = require('logger')(module);

function User(name) {
    this.name = name;
}

User.prototype.hello = function(who) {
    // фразы выводятся через метод из логгера. Имя файла + фраза
    log(db.getPhrase("Hello") + ", " + who.name);
}

module.exports = User;