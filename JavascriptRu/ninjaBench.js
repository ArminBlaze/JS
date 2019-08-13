//		Тест выдаёт во сколько раз одна ф-ция быстрее другой

function sumTo(n) { // обычный цикл 1+2+...+n
	var result = 0;
	for (var i = 1; i <= n; i++) {
		result += i;
	}
	return result;
}

function sumToRec(n) { // рекурсия sumToRec(n) = n+SumToRec(n-1)
	return n == 1 ? 1 : n + sumToRec(n - 1);
}


results =  ninjaBenchmark([sumTo, sumToRec], 1000, 10000);
console.log( showBestResults(results) );


//оформить это в модуль с 2-мя функциями на экспорт
function showBestResults(resultArr) {
	var best = {time: Infinity, fn: 0};
	var second = {time: Infinity, fn: 0};

	resultArr.forEach( (time, i) => {
		if(time < best.time) {
			best = {time, fn: i};
		}
		else if(time < second.time) {
			second = {time, fn: i}
		}
	})


	return `Лучшее время ${best.time} мс у функции ${best.fn}\n` +
					`Второе время ${second.time} мс у функции ${second.fn}\n` +
					`Функция ${best.fn} быстрее чем функция ${second.fn} в ${second.time/best.time } раз`
}

function ninjaBenchmark(funcsArr, repeatNum, fnArg) {
	var resultArr = funcsArr.map(fn => {
		var timeLoop = performance.now();
		for (var i = 1; i < repeatNum; i++) fn(fnArg); // цикл
		timeLoop = performance.now() - timeLoop;

		return timeLoop;
	});

	return resultArr;
}

export {
	ninjaBenchmark,
	showBestResults
}