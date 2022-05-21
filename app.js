// define UI forms
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listners
loadEventListener();

// load all event listner
function loadEventListener() {
  // task from LS
  document.addEventListener('DOMContentLoaded', getTasks);
  // add enent
  form.addEventListener('submit', addTask);
  // to remove tasks
  taskList.addEventListener('click', removeTask);

//  to clear the tasks
clearBtn.addEventListener('click', clearTasks);
//  to filter the tasks
filter.addEventListener('keyup', filterTasks);

}
// getTasks
function getTasks () {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
tasks.forEach(function(task) {
   // create Element
   const li = document.createElement('li');
   li.className = 'collection-item';       
   li.appendChild(document.createTextNode(task));
 
   // add link for font awesome to delete tasks
 
   const link = document.createElement('a');
   link.className = 'delete-item secondary-content';
   link.innerHTML = '<i class = "fa fa-remove" > </i>' ;
   li.appendChild(link);
 
   taskList.appendChild(li);

})
}
// add task functin
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a Task')
  }

  // create Element
  const li = document.createElement('li');
  li.className = 'collection-item';       
  li.appendChild(document.createTextNode(taskInput.value));

  // add link for font awesome to delete tasks

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class = "fa fa-remove" > </i>' ;
  li.appendChild(link);

  taskList.appendChild(li);

  // add in local storage
  storeTaskInLocalStorage(taskInput.value);


  taskInput.value = '';

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
let tasks;

  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks' , JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure')) {
    e.target.parentElement.parentElement.remove();
    // romove from ls
    removeTasksFromLocalStorage
    (e.target.parentElement.parentElement);
  }
  }
  
}

// remove tasks from ls
function removeTasksFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
} } )
localStorage.setItem('tasks' , JSON.stringify(tasks));
}
// clear tasks function
function clearTasks() {
  while (taskList.firstChild) {

    taskList.removeChild(taskList.firstChild);

  }
clearTasksFromLocalStorage();
}
// clear from ls
function clearTasksFromLocalStorage() {
  localStorage.clear();
}


// function for filtertasks
function filterTasks (e) {
  const text = filter.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task) {
    const item = task.firstChild.textContent; 
    if(item.toLocaleLowerCase().indexOf(text) != -1) {
task.style.display = 'block';

    } else {
      task.style.display = 'none';
    }
    }
  );
}