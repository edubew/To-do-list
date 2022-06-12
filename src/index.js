import './styles/index.css';
import Task from './Task';

const listContainer = document.querySelector('.list-container');
const inputField = document.querySelector('input');
const tasks = document.querySelector('.tasks');
const button = document.querySelector('button');
const data = JSON.parse(localStorage.getItem('list'));

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
      updateStorage();
    });
  });

  // Add data to local storage
  const storedData = new Task(taskValue, false, checkbox.length - 1);
  listArray.push(storedData);
  localStorage.setItem('list', JSON.stringify(listArray));

  // Edit event listener
  const editBtn = document.querySelectorAll('.edit-btn');
  editBtn.forEach((i) => {
    i.addEventListener('click', () => {
      editTask(listItem, i.previousElementSibling);
      // updateStorage();
    });
  });

  //  Delete event listener
  const removeBtn = document.querySelectorAll('.delete-btn');
  removeBtn.forEach((i) => {
    i.addEventListener('click', () => {
      deleteTask(i.parentElement);
    });
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

// edit functionality
const editTask = (listItem, task) => {
  const editInput = document.createElement('input');
  const storedData = JSON.parse(localStorage.getItem('list'));
  editInput.type = 'text';
  editInput.className = 'editInput';
  editInput.value = task.textContent;
  listItem.replaceChild(editInput, task);
  editInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && editInput.value) {
      const result = storedData.filter((text) => text.description === task.textContent);
      const emptyArray = [];
      for (let i = 0; i < storedData.length; i += 1) {
        if (storedData[i].index === result[0].index) {
          storedData[i].description = editInput.value;
        }
        emptyArray.push(storedData[i]);
        localStorage.setItem('list', JSON.stringify(emptyArray));
      }
      listItem.replaceChild(task, editInput);
      task.textContent = editInput.value;
    }
  });
};

// Delete task from list
const deleteTask = (task) => {
  tasks.removeChild(task);
  let count = -1;
  const storedData = JSON.parse(localStorage.getItem('list'));
  const data = Array.from(storedData).filter((i) => i.completed === false);
  data.map((i) => i.index = count += 1);
  localStorage.setItem('list', JSON.stringify(data));
};

// Get data from local storage
const getData = () => {
  data.map((i) => {
    listArray.push(i);
    const listItem = document.createElement('li');
    listItem.innerHTML = `
  <input type="checkbox" class="checkbox"/>
  <span>${i.description}</span >
  <i class="fa-solid fa-ellipsis-vertical edit-btn"></i>
  <i class="fa-solid fa-trash-can delete-btn"></i>
  `;
    tasks.appendChild(listItem);

    const editBtn = document.querySelectorAll('.edit-btn');
    editBtn.forEach((i) => {
      i.addEventListener('click', () => {
        editTask(listItem, i.previousElementSibling);
      });
    });
  });

  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checkContainer');
      i.nextElementSibling.classList.toggle('checkTask');
      i.parentElement.lastElementChild.classList.toggle('active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('disable');
      updateStorage();
    });
  });

  const removeBtn = document.querySelectorAll('.delete-btn');
  removeBtn.forEach((i) => {
    i.addEventListener('click', () => {
      deleteTask(i.parentElement);
    });
  });

  localStorage.setItem('list', JSON.stringify(listArray));
};

window.addEventListener('load', getData);

const updateStorage = () => {
  const localData = JSON.parse(localStorage.getItem('list'));
  const task = document.querySelectorAll('span');
  for (let i = 0; i < task.length; i += 1) {
    if (task[i].classList.contains('checkTask')) {
      localData[i].completed = true;
    } else {
      localData[i].completed = false;
    }
  }
  localStorage.setItem('list', JSON.stringify(localData));
};

const clearAll = () => {
  const localData = JSON.parse(localStorage.getItem('list'));
  const listItem = document.querySelectorAll('listItem');
  listItem.forEach((i) => {
    if (i.classList.contains('checkContainer')) {
      deleteTask(i);
    }
  });
  let count = 0;
  const data = Array.from(localData).filter((i) => i.completed === false);
  data.map((i) => i.index = count += 1);
  localStorage.setItem('list', JSON.stringify(data));
  window.location.reload();
};

button.addEventListener('click', clearAll);
