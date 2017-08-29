//Вешаем события на кнопку и окно ввода после загрузки страницы

function init() {
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	
	var form = document.getElementById("form");
	form.addEventListener("submit", function(e){
				e.preventDefault();
				handleFireButton();
	});
	
	handleCells();
	
	model.generateShipLocations();
}

function handleCells() {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
	
	var table = document.getElementById("table");
	var trs = table.querySelectorAll("tr");
	
	for (var i = 0; i < trs.length; i++) {
		var tr = trs[i];
		var tds = tr.querySelectorAll("td");
		
		for (var j = 0; j < tds.length; j++) {
			//перевод буквы в цифру
			var row = alphabet[i];
			var column = j;
			var td = tds[j];
			
			td.classList.add("" + row + column);
			td.onclick = handleTd;
		}
	}
	
}

function handleTd() {
	// Код получения данных от формы
	var guess = this.className;
	
	//НУЖНО ПЕРЕДАВАТЬ КЛАССЫ
	
	
	controller.processGuess(guess);
}

function handleFireButton() {
	// Код получения данных от формы
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);
	guessInput.value = "";
	guessInput.focus();
}

window.onload = init;




//Объект отображения



var view = {
	displayMessage: function(msg) {
		var area = document.getElementById("messageArea");
		area.innerHTML = msg;
	},
	
	//location нужно передавать как строку ("01"), иначе JS будет считать это 8-ричным числом
	displayHit: function(location) {
		var location = location + "";
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},
	
	displayMiss: function(location) {
		var location = location + "";
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}
};






////////////////////////////////////////////////////////////////////
//Объект модели
////////////////////////////////////////////////////////////////////



var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	
//	ships: [
////		{ locations: [0, 0, 0], hits: ["", "", ""] },
////		{ locations: [0, 0, 0], hits: ["", "", ""] },
////		{ locations: [0, 0, 0], hits: ["", "", ""] }
//	],
	ships:  [],
	
	//генерируем пустой массив кораблей. Иначе функция генерации кораблей не будет работать
	init: function() {
		var ships = [];
		for(var i = 0; i < this.numShips; i++) {
			ships.push({locations: [0, 0, 0], hits: ["", "", ""]});
		}
		console.log(ships);
		this.ships = ships;
		return this;
	},
	
//	ships: model.createEmptyShips(),
	
	
	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) { //можно заменить на ships.length
			var ship = this.ships[i];
//			locations = ship.locations;
			var index = ship.locations.indexOf(guess); //метод массива, ищет значение и возвращает его индекс или -1
			if (index >= 0) {
				// Есть попадание!
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");
				if (this.isSunk(ship)) {	//проверяем, потоплен ли корабль
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++; 
				}
				return true; //есть попадание
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false; //нет попадания
	},
	
	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
	},
	
	
	
	//создаёт массив кораблей ships
	generateShipLocations: function () {
		var locations;		//позиции корабля
		for (i = 0; i < this.numShips; i++) { //генерируем позиции для всех кораблей
			do {
				locations = this.generateShip();		//генерируем позиции корабля
			} while (this.collision(locations)); //если корабль перекрывает другие - генерируем новые
			this.ships[i].locations = locations;		//записываем координаты корабля в массив ships
		}
		
		
//		Отладочный цикл, для отображения созданных кораблей
//		for(i = 0; i < this.ships.length; i++) {
//			var ship = this.ships[i];
//			for (j = 0; j < ship.locations.length; j++) {
//				view.displayHit(ship.locations[j]);
//			}
//		}
	},
	
	
	//создаёт один корабль
	generateShip: function() {
		var direction = Math.floor(Math.random() * 2); //генерируем число 0 или 1, это направление корабля
//		var direction = 0;
		
		var row, col;
		var locations = [];
		
		if (direction === 1) {
			//генерируем начальную позицию горизонтального корабля
			var row = ~~(Math.random() * this.boardSize);
			var col = ~~(Math.random() * (this.boardSize - this.shipLength + 1));
			locations.push("" + row + col);
			locations.push("" + row + (col + 1));
			locations.push("" + row + (col + 2));
		} else {
			//генерируем начальную позицию вертикального корабля
			var row = ~~(Math.random() * (this.boardSize - this.shipLength + 1));
			var col = ~~(Math.random() * this.boardSize);
			locations.push("" + row + col);
			locations.push("" + (row + 1) + col);
			locations.push("" + (row + 2) + col);
		}
//		console.log(direction);
//		console.log(locations);
//		for(i = 0; i < locations.length; i++) {
//			view.displayHit(locations[i]);
//		}
		return locations;
	},
	
	
	//проверяет, не перекрывается ли корабль
	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) { //перебираем все корабли в массиве кораблей
			var ship = model.ships[i];
			for (var j = 0; j < locations.length; j++) {  //перебираем все координаты нового корабля
				if (ship && ship.locations.indexOf(locations[j]) >= 0) { //если новый корабль пересекается со старым
					return true;  //возвращаем "да, он совпадает"
				}
			}
		}
		return false; //если нет совпадений координат с ранее созданными кораблями
	}
	
}.init(); //запускаем функцию генерации пустого массива кораблей





////////////////////////////////////////////////////////////////////
//Объект контроллера
////////////////////////////////////////////////////////////////////



var controller = {
	guesses: 0,
	hitLog: [],
	
	processGuess: function (guess) {
		console.log(guess);
		var location = this.parseGuess(guess);
		var hitLog = this.isHit(location);
		if(location && hitLog) {
			alert("You already fired in this cell!");
		} else if (location && model.shipsSunk < model.numShips) { // && model.shipsSunk < model.numShips
			this.guesses++;
			this.hitLog.push(location);
			
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage("You sank all my battleships, in " +
				this.guesses + " guesses");
			}
		} else if (model.shipsSunk >= model.numShips){
			alert ("You already sank all my battleships!")
		}
	},
	
	parseGuess: function (guess) {
		var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
		
		if (!guess || guess.length !== 2) {
			alert("Oops, please enter a letter and a number on the board.")
		} else {
			//перевод буквы в цифру
			var firstChar = guess.charAt(0);
			var row = alphabet.indexOf(firstChar);
			var column = guess.charAt(1);
			
			if(!isFinite(row) || !isFinite(column)) {
				alert("Oops, that isn't on the board.");
			} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
				alert("Oops, that's off the board!");
			} else {
				return row + column;
			}
		}
		
		return null;
	},
	
	isHit: function (location) {
		for (var i = 0; i < this.hitLog.length; i++) {
			if (this.hitLog[i] == location) {
				return true;
			}
		}
		return false;
	}
};




//Сделать кнопку "Ещё раз?"

//Сделать модельное окно, после завершения игры со статистикой и кнопкой "Еще раз?"


//генерировать всем клеткам динамически номера? (не обязательно)

//Как создаётся объект ships в модели? Свойства hits каждого корабля?

