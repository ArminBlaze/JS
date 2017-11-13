describe("pow", function() {
	
//	before(function() { alert("Начало тестов"); });
//  after(function() { alert("Конец тестов"); });
//
//  beforeEach(function() { alert("Вход в тест"); });
//  afterEach(function() { alert("Выход из теста"); });
	
	describe("возводит x в степень n", function() {

		function makeTest(x) {
			var expected = x * x * x;
			it("при возведении " + x + " в степень 3 результат: " + expected, function() {
				assert.equal(pow(x, 3), expected);
			});
		}

		for (var x = 1; x <= 5; x++) {
			makeTest(x);
		}

	});
	
	describe("любое число, кроме нуля, в степени 0 равно 1", function() {

    function makeTest(x) {
      it("при возведении " + x + " в степень 0 результат: 1", function() {
        assert.equal(pow(x, 0), 1);
      });
    }

    for (var x = -5; x <= 5; x += 2) {
      makeTest(x);
    }

  });

  it("при возведении 2 в 3ю степень результат 8", function() {
    assert.equal(pow(2, 3), 8); //equal лучше простого выражения в скобках assert(). Потому что вернёт дополнительные подробности. "pow(2,3) не равно 8" "expected 8 to equal 81"
  });
	
	it("при возведении 3 в 4ю степень результат 81", function() {
    assert.equal(pow(3, 4), 81);
  });
	
  it("при возведении в отрицательную степень результат NaN", function() {
    assert(isNaN( pow(2, -1) ));	//assert (выражение). Скобки должны вернуть true. Потому, что NaN не равно NaN.
  });

  it("при возведении в дробную степень результат NaN", function() {
    assert(isNaN(pow(2, 1.5)), "pow(2, 1.5) не NaN"); //последний аргумент - строка, которая будет показана при ошибке. Вместо "Unspecified AssertionError".
  });
	
	it("ноль в нулевой степени даёт NaN", function() {
    assert(isNaN(pow(0, 0)), "0 в степени 0 не NaN");
  });
});


//
//assert(value) – проверяет что value является true в логическом контексте.
//assert.equal(value1, value2) – проверяет равенство value1 == value2.
//assert.strictEqual(value1, value2) – проверяет строгое равенство value1 === value2.
//assert.notEqual, assert.notStrictEqual – проверки, обратные двум предыдущим.
//assert.isTrue(value) – проверяет, что value === true
//assert.isFalse(value) – проверяет, что value === false

