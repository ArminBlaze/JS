// затормозить функцию до одного раза в 1000 мс
// var myFunc1000 = throttle(myFunc, 1000);

function throttle (f, ms) {
  var timer;
  var args;
  var called = false;

  return function() {	
//				debugger;
    var self = this;
    args = [].slice.call(arguments);

    if(timer) {
      called = true;
      return;
    }

    f.apply(self, args);

    //рекурсивный вызов timeout вместо interval
    timer = setTimeout(function runTimer() {
//					debugger;
      if(!called) {
        timer = null;
      }

      if (timer && called) {
        f.apply(self, args);
        timer = setTimeout(runTimer, ms, args);
      }

      called = false;
    }, ms, args);
  };
}