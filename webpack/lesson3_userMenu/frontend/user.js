export default class User {
  
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