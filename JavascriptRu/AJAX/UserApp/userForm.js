class UserForm {
  constructor(user) {
    this.user = user;
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
      <p>_id: <%=user["_id"]%></p>
      <p>Full Name: <input type="text" name="fullName" required></p>
      <p>Email: <input type="email" name="email" required></p>
      
      <% for(let prop in user) { %>
        <% if(prop == "fullName" || prop == "email" || prop == "_id") continue; %>
        <p><%=prop%>: <input type="text" name="<%=prop%>" required></p>
      <% } %>
    
      <p><input type="submit" value="Submit"></p>
      </form>
    </div>`)({user: this.user});
    this.elem = createElementFromHtml(html);
    
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
    
    // console.log(this.user);
    
    // TODO
    // SAVE ON SERVER
    // let xhr = new XMLHttpRequest();
    // xhr.open('GET', 'http://test-api.javascript.ru/v1/iliakan/users');
    // xhr.onload = () => {
    //   // todo: handle errors
    //   this.users = JSON.parse(xhr.responseText);
    //   this.userList.showUsers(this.users);
    // }
    // xhr.send();
    
    
    
    let xhr = new XMLHttpRequest();
    xhr.open('PATCH', 'http://test-api.javascript.ru/v1/iliakan/users/' + this.user._id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(this.user));
    
    
    xhr.onload = () => {
      if (xhr.status != 200) {
        alert("Error: " + xhr.responseText);
      } else {
        console.log('Form Sended');
        console.log(this);
        this.generateEvent();
        console.log(xhr.responseText);
      }
    }
    
    xhr.onerror = function() {
      alert("Sorry error! Try again later");
    };
    
    // TRIGGER EVENT
    
    // if (event.target.dataset.userId) {
    //   this.elem.dispatchEvent(new CustomEvent('user-select', {
    //     bubbles: true,
    //     detail: event.target.dataset.userId
    //   }));
      
    //   event.preventDefault();
    // }
    
    // console.log(noError + " noError");
    
    
    
    
    
    
    // (app will update user in userList and close the form)
    event.preventDefault();
    
  }
  
  generateEvent() {
    this.elem.dispatchEvent(new CustomEvent('form-send', {
          bubbles: true,
          detail: this.user._id
        }));
  }
  
  destroy() {
    this.elem.parentNode.removeChild(this.elem);
  }
}