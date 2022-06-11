import './styles/index.css';

const listContainer = document.querySelector('.list-container');
const inputField = document.querySelector('input');
const tasks = document.querySelector('.tasks');
const button = document.querySelector('button');

// my tasks class
class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

// add task to the UI functionality
const listArray = [];

const addTask = (taskValue) => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
  <input type="checkbox" class="checkbox"/>
  <span>${taskValue}</span >
  <i class="fa-solid fa-ellipsis-vertical edit-btn"></i>
  <i class="fa-solid fa-trash-can delete-btn"></i>
  `;
  tasks.appendChild(listItem);

  // checkbox functionality
  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checkContainer');
      i.nextElementSibling.classList.toggle('checkTask');
      i.parentElement.lastElementChild.classList.toggle('active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('disable');
    });
  });

  // Add data to local storage
  const store = new Task(taskValue, false, checkbox.length - 1);
  listArray.push(store);
  localStorage.setItem('list', JSON.stringify(listArray));

  // Edit functionality
  const editBtn = document.querySelectorAll('.edit-btn');
  editBtn.forEach((i) => {
    i.addEventListener('click', () => {
      editTask(listItem, i.previousElementSibling);
    });
  });
};

const editTask = (listItem, task) => {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'editInput';
  editInput.value = task.textContent;
  listItem.replaceChild(editInput, task);
  editInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const listItemContainers = document.querySelectorAll('.listItem');
      const storedData = JSON.parse(localStorage.getItem('list'));
      for (let i = 0; i < listItemContainers.length; i += 1) {
        if (listItemContainers[i].classList.contains('checkContainer')) {
          storedData[i].description = editInput.value;
          localStorage.setItem('list', JSON.stringify(storedData));
        }
      }
      editInput.parentElement.classList.remove('checkContainer');
      listItem.replaceChild(task, editInput);
      task.textContent = editInput.value;
    }
  });
};

// add task event listener
inputField.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputField.value) {
    e.preventDefault();
    addTask(inputField.value);
    inputField.value = null;
  }
});