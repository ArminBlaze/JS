'use strict';

var CATS = [
	{	
		name: "Pufik",
		src: "img/1.jpg",
		color: "hsl(219, 82%, 62%)",
		nickNames: ['Pufka', 'Pufyak']
	},
	{	
		name: "Mufik",
		src: "img/2.jpg",
		color: "hsl(335, 82%, 62%)",
		nickNames: ['Mufon', 'Mu']
	},
	{
		name: "Popik",
		src: "img/3.jpg",
		color: "hsl(53, 82%, 62%)",
		nickNames: ['Popka']
	},
	{
		name: "Durik",
		src: "img/4.jpg",
		color: "hsl(272, 82%, 62%)",
	},
	{
		name: "Lufik",
		src: "img/5.jpg",
		color: "hsl(125, 82%, 62%)"
	},
];


var Cat = function(data) {
	this.clicks = ko.observable(data.clicks || 0);
	this.name = ko.observable(data.name);
	this.color = ko.observable(data.color);
	this.imgSrc = ko.observable(data.src);
	this.imgAttribution = ko.observable('xz');
	this.nickNames = ko.observableArray(data.nickNames || []);
	
	this.level = ko.observable(0);
	this.levels = [
		{max: 10, name: "Новорожденный"},
		{max: 50, name: "Слепой котёнок"},
		{max: 100, name: "Пушистый котёнок"},
		{max: 150, name: "Подросток"},
		{max: undefined, name: "Взрослый кот"},
	];
	
	this.getLevel = ko.computed(function() {
		if(this.levels[this.level()].max && this.clicks() >= this.levels[this.level()].max) {
			this.level( this.level() + 1);
		}
		return this.levels[this.level()].name;
	}, this)
}

var ViewModel = function() {
	var self = this;
	
	this.catList = ko.observableArray([]);
	
	//тут используем self, т.к. this не будет работать
	CATS.forEach( function (cat) {
		self.catList.push( new Cat(cat) );
	} );
	
	this.currentCat = ko.observable( this.catList()[0] );
	
	//это метод модели, но в HTML мы вызываем его в контексте кота. Поэтому this будет currentCat
	//with задаёт контекст выполнения метода. Этот метод как-бы виртуально перемещается внутрь currentCat
//	чтобы метод ссылался именно на объект, в котором его создали - нужно использовать self = this
	this.increaseCounter = function() {
		this.clicks(this.clicks() + 1);
	};
	
	this.listClickHandler = function(model, e) {
		var target = e.target;
		var id = target.dataset.toggleId;
		this.deselectCatInList( this.currentCat() );
		this.currentCat( this.catList()[id] );
		this.selectCatInList();
	};
	
	this.selectCatInList = function() {
		var cat = self.currentCat();
		cat.button.classList.add('catsList__cat_selected');
		cat.button.style.background = cat.color();
	}

	this.deselectCatInList = function(cat) {
		cat.button.classList.remove('catsList__cat_selected');
		cat.button.style.background = '';
	}
	
//	this.selectCatInList( this.currentCat() );
	
}


ko.bindingHandlers.writeElemToObj = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
			viewModel.button = element;
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.
    }
};


/*global ko:true*/
ko.applyBindings(new ViewModel());

