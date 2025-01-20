const todoList = [];

function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i]; 
    const { name, dueDate, isFinished } = todoObject; 

    
    const html = `
      <div class="${isFinished ? 'finished-task' : ''}">
        <!-- Checkbox to mark the task as finished -->
        <input type="checkbox" 
               onclick="toggleFinished(${i});" 
               ${isFinished ? 'checked' : ''}>
        ${name}
      </div>
      <div>${dueDate}</div>
      <!-- Button to delete the todo item -->
      <button onclick="
        todoList.splice(${i}, 1); 
        renderTodoList(); 
      " class="delete-todo-button">Delete</button>      
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

  todoList.push({
    name: name, 
    dueDate: dueDate, 
    isFinished: false
  });

  inputElement.value = '';

  renderTodoList();
}

function toggleFinished(index) {
  todoList[index].isFinished = !todoList[index].isFinished; 
  renderTodoList(); 
}
