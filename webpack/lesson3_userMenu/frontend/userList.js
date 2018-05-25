import template from './userList.pug';


export default class UserList {
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
    tmp.innerHTML = template({});
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