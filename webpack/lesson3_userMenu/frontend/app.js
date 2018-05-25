'use strict';
import './style.css';

import User from './user'; // ./menu/index.js
import UserForm from './userForm.js'; // ./menu/index.js
import UserList from './userList.js'; // ./menu/index.js


class Application {
  
  constructor() {
    this.userList = new UserList();
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
    this.userForm = new UserForm(user);
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
      this.users = JSON.parse(xhr.responseText).map((userModel)=>{return new User(userModel)})
      this.userList.showUsers(this.users);
    }
    xhr.send();
  }
  
};

let application = new Application();