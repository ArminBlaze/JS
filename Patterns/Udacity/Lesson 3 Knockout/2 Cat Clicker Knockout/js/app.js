var ViewModel = function() {
	this.clicks = ko.observable(0);
	this.level = ko.observable(0);
	this.levels = [
		{max: 10, name: "Новорожденный"},
		{max: 50, name: "Слепой котёнок"},
		{max: 100, name: "Пушистый котёнок"},
		{max: 150, name: "Подросток"},
		{max: undefined, name: "Взрослый кот"},
	]
	
	this.name = ko.observable('Pufik');
	this.imgSrc = ko.observable('img/2.jpg');
	this.imgAttribution = ko.observable('xz');
	
	this.increaseCounter = function() {
		this.clicks(this.clicks() + 1);
	};
	
	this.getLevel = ko.computed(function() {
		if(this.levels[this.level()].max && this.clicks() >= this.levels[this.level()].max) {
			this.level( this.level() + 1);
		}
		return this.levels[this.level()].name;
	}, this)
}

/*global ko:true*/
ko.applyBindings(new ViewModel());