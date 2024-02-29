const todoList = document.getElementById('todo-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const searchTaskInput = document.getElementById('search-task');

let tasks = localStorage.getItem('tasks')
  ? JSON.parse(localStorage.getItem('tasks'))
  : [];

  const renderTasks = (filteredTasks = tasks) => {
    todoList.innerHTML = ''; //Limpar

    filteredTasks.forEach((task) => {
      const listItem = document.createElement('li');
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
  
      listItem.appendChild(checkbox);
  
      const taskText = document.createElement('span');
      taskText.textContent = task.text;
      listItem.appendChild(taskText);
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      listItem.appendChild(editButton);
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      listItem.appendChild(deleteButton);

      checkbox.addEventListener('change', () => {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
      });
  

      editButton.addEventListener('click', () => {
        const newTaskText = prompt('Edit task: ', taskText);
        if (newTaskText) {
          task.text = newTaskText;
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        }
      });

    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter((t) => t !== task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    });

    todoList.appendChild(listItem);
  });
};

renderTasks();

addTaskButton.addEventListener('click', () => {
  const newTaskText = newTaskInput.value.trim();
  if (newTaskText) {
    tasks.push({ text:newTaskText, completed:false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    newTaskInput.value='';
    renderTasks();
  }
});

searchTaskInput.addEventListener('keyup', () => {
  const SeachTerm = searchTaskInput.value.loLowerCase();
  const filteredTasks = tasks.filter((task) => {
    return task.text.toLowerCase().includes(searchTerm);
  });
  renderTasks(filteredTasks);
});