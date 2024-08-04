const todoList = JSON.parse(localStorage.getItem('todo')) || [];

renderTodoList();

function renderTodoList(){
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    
    const time = dayjs();
    const date = time.date();
    const day = time.month() + 1;
    const year = time.year();
    const displayDate = `${date}/${day}/${year}`;

    const { name } =todoObject;   
    const html = `
    <div class="col-12 mb-2">
        <div class="d-inline position-relative">
          <input type="text" value="${name}" class=" todo-list js-todo-list-${index} me-1 p-2" disabled>
          <button class="p-2 text-success border-0 edit-list-btn position-absolute js-edit-list-btn">Edit</button>
          <button class="text-white p-2 border-0 delete-list-btn js-delete-list-btn">Delete</button><br>
          <span class="date">${displayDate}</span>
        </div>
      </div>
    `
    todoListHTML += html;
  })

  document.querySelector('.js-allTodos-list').innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-list-btn').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodoList();
      saveToStorage();
    });
  }); 

  document.querySelectorAll('.js-edit-list-btn').forEach((editButton, index) => {
    editButton.addEventListener('click', () => {
      const displayInput = document.querySelector(`.js-todo-list-${index}`);
      if(editButton.innerText === 'Edit')
        {
          displayInput.disabled = false;
          displayInput.focus();
          editButton.innerText = 'Save';
        } 
      else 
        {
          const name = displayInput.value;
          displayInput.focus();
          if(name.trim() !== ''){
          todoList[index].name = name;
          saveToStorage();
          displayInput.disabled = true;
          editButton.innerText = 'Edit';
          }
        }
    })
  })
};



document.querySelector('.js-add-todo-btn').addEventListener('click', addTodo);

function addTodo(){
  const inputElement = document.querySelector('.js-input-todo');
  const name = inputElement.value;
  if(name.trim() === ''){
    alert('Enter Todo!');
    return;
  }
  todoList.push({
    name,
  })
 
  inputElement.value = '';
 
  renderTodoList();
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('todo', JSON.stringify(todoList));
}

