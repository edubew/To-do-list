import './styles/index.css';

const task = [
  {
    index: 1,
    description: 'Wash the dishes',
    completed: 'true',
  },
  {
    index: 2,
    description: 'Complete To Do list project',
    completed: 'true',
  },
  {
    index: 3,
    description: 'Prepare dinner',
    completed: 'true',
  },
];

const list = task.map((item) => `
 <li><input type ="checkbox">${item.description}</li>`).join('');

const tasks = document.querySelector('.tasks');
tasks.innerHTML += list;