class Application {
  
  constructor() {
    this.userList = new UserList();
    this.render();
  }
  
  render() {
    document.body.append(this.userList.getElem());
    
    this.load();
    
    this.userList.getElem().addEventListener('user-select', this.onUserSelect.bind(this))
    
    
  }
  
  onUserSelect(event) {
    let user = this.users.find(user => user._id == event.detail);
    if (this.userForm) {
      this.userForm.destroy();
    }
    this.userForm = new UserForm(user);
    document.body.append(this.userForm.getElem());
    
    this.userForm.getElem().addEventListener('form-send', this.onFormSend.bind(this))
  }
  
  onFormSend(event) {
    // let user = this.users.find(user => user._id == event.detail);
    // if (this.userForm) {
    //   this.userForm.destroy();
    // }
    // this.userForm = new UserForm(user);
    // document.body.append(this.userForm.getElem());
    
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://test-api.javascript.ru/v1/iliakan/users/' + event.detail);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();
      
      xhr.onload = () => {
        if (xhr.status != 200) {
          alert("Error: " + xhr.responseText);
        } else {
          console.log('Ok');
          console.log(xhr.responseText);
          var user = JSON.parse(xhr.responseText);
          console.log(user);
          //записать этого юзера в юзерЛист (обновить его там)
          this.userList.modifyUser(user);
          
          
          // for (var key in user) {
          //   // этот код будет вызван для каждого свойства объекта
          //   // ..и выведет имя свойства и его значение
          
          //   alert( key + ": " + user[key] );
          // }
          
        }
      }
      
      xhr.onerror = function() {
        alert("Sorry error! Try again later");
      };
  }
  
  
  load() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://test-api.javascript.ru/v1/iliakan/users');
    xhr.onload = () => {
      // todo: handle errors
      this.users = JSON.parse(xhr.responseText);
      this.userList.showUsers(this.users);
    }
    xhr.send();
  }
  
}