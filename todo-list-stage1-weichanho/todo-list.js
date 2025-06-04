let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i]; 
    const { name, dueDate, isFinished } = todoObject; 

    const html = `
      <div class="${isFinished ? 'finished-task' : ''}">
        <input type="checkbox" 
               onclick="toggleFinished(${i});" 
               ${isFinished ? 'checked' : ''}>
        ${name}
      </div>
      <div>${dueDate}</div>
      <button onclick="deleteTodo(${i});" class="delete-todo-button">Delete</button>      
    `;

    todoListHTML += html;
  }

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value; 

  if (!name || !dueDate) return;

  todoList.push({
    name: name, 
    dueDate: dueDate, 
    isFinished: false 
  });

  saveTodoList();

  inputElement.value = '';
  dateInputElement.value = '';

  renderTodoList();
}

function toggleFinished(index) {
  todoList[index].isFinished = !todoList[index].isFinished; 
  saveTodoList(); 
  renderTodoList(); 
}

function deleteTodo(index) {
  todoList.splice(index, 1); 
  saveTodoList(); 
  renderTodoList(); 
}

function saveTodoList() {
  localStorage.setItem('todoList', JSON.stringify(todoList)); 
}

renderTodoList();



// TODO: for to-do items
// ! is used for important or warning messages
// ? is used for questions or content that needs confirmation
// * Used for emphasis or important instructions
// Other common comments

