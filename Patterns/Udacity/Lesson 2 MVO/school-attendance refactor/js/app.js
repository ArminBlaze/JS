/* STUDENTS IGNORE THIS FUNCTION
* All this does is create an initial
* attendance record if one is not found
* within localStorage.
*/



/* STUDENT APPLICATION */
const NAMES = [`Slappy the Frog`, `Lilly the Lizard`, `Paulrus the Walrus`, `Gregory the Goat`, `Adam the Anaconda`];

	if (!localStorage.attendance) {
		console.log('Creating attendance records...');
		function getRandom() {
			return (Math.random() >= 0.5);
		}

		var attendance = {};


		NAMES.forEach(function(name) {
			attendance[name] = [];

			for (var i = 0; i <= 11; i++) {
				attendance[name].push(getRandom());
			}
		});

		localStorage.attendance = JSON.stringify(attendance);
	}



	var model = {
		init() {
			this.attendance = this.loadFromStorage();
			console.log(this.attendance);
		},

		loadFromStorage() {
			return JSON.parse(localStorage.attendance);
		},

		saveToStorage() {
			localStorage.attendance = JSON.stringify(this.attendance);
		}
	}

	model.init();

	let controller = {
		calculateMissedDays(name) {
			return model.attendance[name].reduce((sum, current) => {
				return sum + current;
			});
		},

		onCheckboxClick(e) {
			let target = e.target;
			let id = target.dataset.id;
			let name = target.dataset.name;
			console.log(id, name);

			//Внести изменения в модель (нужный чекбокс true)
			model.attendance[name][id] = target.checked;
			console.log(model.attendance[name]);


			//Отрисовать изменения в виде
			view.refresh(name);
			model.saveToStorage();
		}
	}


	let view = {
		init(data) {
			this.table = document.body.querySelector('.mainTable');
			this.render(data);

			this.missedCols = {};
			this.table.querySelectorAll('.missed-col').forEach((item, i) => {
				if(i > 0) {
					this.missedCols[item.parentNode.dataset.name] = item;
				}
			});
			console.log(this.missedCols);

			this.table.addEventListener('change', function(e) {
				controller.onCheckboxClick(e);
			})
		},

		refresh(name) {
			let value = controller.calculateMissedDays(name);
			this.missedCols[name].innerHTML = value;
		},

		render(data) {
			var str = this.tableHeaderTemplate() + this.tableBodyTemplate(data);
			this.table.innerHTML = str;
		},

		tableHeaderTemplate() {
			return `<thead><tr>
				<th class="name-col">Student Name</th>
				<th>1</th>
				<th>2</th>
				<th>3</th>
				<th>4</th>
				<th>5</th>
				<th>6</th>
				<th>7</th>
				<th>8</th>
				<th>9</th>
				<th>10</th>
				<th>11</th>
				<th>12</th>
				<th class="missed-col">Days Missed-col</th>
			</tr></thead>`
		},

		tableBodyTemplate(data) {
			var str = ``;

			for(let studentName in data) {
				str+= `<tr class="student" data-name="${studentName}">
				<td class="name-col">${studentName}</td>
				${generateInputTD(studentName)}
				<td class="missed-col">${controller.calculateMissedDays(studentName)}</td>
			</tr>`
			}

			function generateInputTD(studentName) {
				let days = data[studentName];
				let str = ``;
				for(var i = 0; i < days.length; i++) {
					str+= `<td class="attend-col"><input type="checkbox" data-name="${studentName}" data-id="${i}" ${(days[i]) ? 'checked' : '' }></td>`
				}
				return str;
			}


			return `<tbody>${str}</tbody>`
		}
	}

	view.init(model.attendance);

