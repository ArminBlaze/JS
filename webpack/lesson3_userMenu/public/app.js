var home =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/app.js":
/*!*************************!*\
  !*** ./frontend/app.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./frontend/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ "./frontend/user.js");
/* harmony import */ var _userForm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userForm.js */ "./frontend/userForm.js");
/* harmony import */ var _userList_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./userList.js */ "./frontend/userList.js");



 // ./menu/index.js
 // ./menu/index.js
 // ./menu/index.js


class Application {
  
  constructor() {
    this.userList = new _userList_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
    console.log(this.userList);
    this.render();
  }
  
  render() {
    console.log(this.userList.getElem());
    document.body.append(this.userList.getElem());
    
    this.load();
    
    this.userList.getElem().addEventListener('user-select', this.onUserSelect.bind(this))
  }
  
  onUserSelect(event) {
    let user = this.users.find(user => user._id == event.detail);
    if (this.userForm) {
      this.userForm.destroy();
    }
    this.userForm = new _userForm_js__WEBPACK_IMPORTED_MODULE_2__["default"](user);
    this.userForm.getElem().addEventListener('user-saved', this.onUserSaved.bind(this))
    
    document.body.append(this.userForm.getElem());
  }
  onUserSaved(event) { 
    this.userList.showUsers(this.users);
    this.onUserSelect({detail:event.detail});
     
  }
  
  
  load() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://test-api.javascript.ru/v1/iliakan/users');
    xhr.onload = () => {
      this.users = JSON.parse(xhr.responseText).map((userModel)=>{return new _user__WEBPACK_IMPORTED_MODULE_1__["default"](userModel)})
      this.userList.showUsers(this.users);
    }
    xhr.send();
  }
  
};

let application = new Application();

/***/ }),

/***/ "./frontend/lib.js":
/*!*************************!*\
  !*** ./frontend/lib.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createElementFromHtml; });
function createElementFromHtml(html) {
  let tmp = document.createElement('div');
  tmp.innerHTML = html.trim();
  return tmp.firstChild;
}

/***/ }),

/***/ "./frontend/style.css":
/*!****************************!*\
  !*** ./frontend/style.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./frontend/user.js":
/*!**************************!*\
  !*** ./frontend/user.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return User; });
class User {
  
  constructor(Model) {
    this._id = Model._id;
    this.fullName = Model.fullName;
    this.email = Model.email;
    this.birthdate = Model.birthdate;
  }
  
  save(model) {
  var user = this;
  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.open('PATCH', 'http://test-api.javascript.ru/v1/iliakan/users/'+user._id, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    }; 

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };
    xhr.send(JSON.stringify(model));
  }); 

  }
  
}

/***/ }),

/***/ "./frontend/userForm.js":
/*!******************************!*\
  !*** ./frontend/userForm.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserForm; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ "./frontend/lib.js");
 // ./menu/index.js

class UserForm {
  constructor(user) {
    this.user = user;
  }
  destroy(){
    this.getElem().parentNode.removeChild(this.getElem());
  }
  
  getElem() {
    if (!this.elem) {
      this.render();
    }
    return this.elem;
  }
   
  render() { 
    let html = _.template(`<div class="user-form">
      <form>
      <p>Full Name: <input type="text" name="fullName" required></p>
      <p>Email: <input type="email" name="email" required></p>
      <p><input type="submit"  value="Submit"></p>
      </form>
    </div>`)();
    this.elem = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["default"])(html);
     
    this.form = this.elem.querySelector('form');
    for(let prop in this.user) {
      if (this.form[prop]) {
        this.form[prop].value = this.user[prop];
      }
    }
    
    this.form.addEventListener('submit', this);
  }
  
  handleEvent(event) {
    this['on' + event.type[0].toUpperCase() + event.type.slice(1)](event);
  }
  
  onSubmit(event) {
    for(let prop in this.user) {
      if (this.form[prop]) {
        this.user[prop] = this.form[prop].value;
      }
    }
    this.user.save({
        email:this.form.email.value,
        fullName:this.form.fullName.value, 
      })
      .then(
        ()=>{
           
            this.user.email = this.form.email.value;
            this.user.fullName = this.form.fullName.value;
            
            this.getElem().dispatchEvent(new CustomEvent('user-saved', {
              bubbles: true,
              detail: this.user._id
            }));
      
            event.preventDefault();
        },
            error => alert(`Rejected: ${error}`)
        )
    event.preventDefault();
    
  }
  
  
}

/***/ }),

/***/ "./frontend/userList.js":
/*!******************************!*\
  !*** ./frontend/userList.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserList; });
/* harmony import */ var _userList_pug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userList.pug */ "./frontend/userList.pug");
/* harmony import */ var _userList_pug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_userList_pug__WEBPACK_IMPORTED_MODULE_0__);



class UserList {
  constructor() {
    
  }
  
  getElem() {
    console.log("UserList getElem");
    if (!this.elem) {
      this.render();
    }
    return this.elem;
  }
  
  render() {
    console.log("render UserList");
    // let html = _.template(`<div class="user-list"></div>`)();
    
    // this.elem = createElementFromHtml(html);

    // let template = ".user-list";

    let tmp = document.createElement('div');
    tmp.innerHTML = _userList_pug__WEBPACK_IMPORTED_MODULE_0___default()({});
    this.elem = tmp.firstElementChild;
    // this.elem = tmp;
    console.log(this.elem);
    this.elem.addEventListener('click', this);
  }
  
  handleEvent(event) {
    this['on' + event.type[0].toUpperCase() + event.type.slice(1)](event);
  }
  
  onClick(event) {
    
    if (event.target.dataset.userId) {
      this.elem.dispatchEvent(new CustomEvent('user-select', {
        bubbles: true,
        detail: event.target.dataset.userId
      }));
      
      event.preventDefault();
    }
  }
  
  showUsers(users) {
    this.users = users;
    
    this.elem.innerHTML = _.template(`<ul>
      <% for(let user of users) { %>
        <li><a href="#" data-user-id="<%=user._id%>"><%=user.fullName%></a></li>
      <% } %>
    </ul>
    `)({ users });
  }
  
  
  
}

/***/ }),

/***/ "./frontend/userList.pug":
/*!*******************************!*\
  !*** ./frontend/userList.pug ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(/*! ../node_modules/pug-runtime/index.js */ "./node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"user-list\"\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ "./node_modules/pug-runtime/index.js":
/*!*******************************************!*\
  !*** ./node_modules/pug-runtime/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      valA = valA && valA[valA.length - 1] !== ';' ? valA + ';' : valA;
      var valB = pug_style(b[key]);
      valB = valB && valB[valB.length - 1] !== ';' ? valB + ';' : valB;
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    return val + '';
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(/*! fs */ 0).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),

/***/ 0:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=app.js.map