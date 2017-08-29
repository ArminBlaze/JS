function print(data) {
			console.log(data);
		}
		
		function sayHello(name, sign) {
			name = name || "Guest";
			sign = sign || "...";
			print("Hello, " + name + sign);
		}
		
		sayHello("John", "!");