const todoInput = document.querySelector('.js-input-todo');
const addTodoBtn = document.querySelector('.js-add-todo-btn');

const todoStorage = [{
  "id" : "1" ,
  "todo" : "Focus on your work"
}, {
  "id" : "2",
  "todo" : "Be patient"
}]

localStorage.setItem('todo', JSON.stringify(todoStorage));
const helo = JSON.parse(localStorage.getItem('todo'));
console.log(helo);



function addTodo(){
  addTodoBtn.addEventListener('click', () => {
    
  })
}