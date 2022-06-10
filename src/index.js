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
  <i class="fa-solid fa-ellipsis-vertical"></i>
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
};

// add event listener
inputField.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputField.value) {
    e.preventDefault();
    addTask(inputField.value);
    inputField.value = null;
  }
});