//const tasks = [
//  { id: 1, text: "Buy groceries", completed: false },
//  { id: 2, text: "Finish assignment", completed: false }
//]; //created an array of task that is known with an id, what is the task and if its completed

// replace that format with:
let tasks = loadTasks();
// we use let instead of const because toggle and delete will replace the array, and it now loads from localStorage so empty first


const task_list=document.getElementById('task_list'); 
const task_input=document.getElementById('task_input');

//add a function so it will save tasks, so when we delete only task saved kept
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // localStorage stores just strings, to do that we converted the array with JSON
}

//function that loads the tasks saved
function loadTasks() {
    try {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : []; // nothing saved yet , will have empty array
    } catch {
        return []; // we put that in case the saved data is corrupted so it start fresh instead of crashing
    }
}

function renderTasks() { // to avoid duplicates
    task_list.innerHTML = ''; //erase everything inside the <ul> with the id task list 

    tasks.forEach((task) =>{ 
        const list=document.createElement('li'); // li is a tab so we u create he will know that u mean to create <li>
        //list.textContent=input.text
        //replaced that list only have a textbox input so il will be composed of a checkbox, the text and a delete button
        const inputs=document.createElement('input');
        inputs.type="checkbox";
        inputs.checked = task.completed; //added this so the checkbox shows the saved state (true/false)
        const span=document.createElement('span');
        span.textContent=task.text; // CHANGED: task.text
        const deleteb=document.createElement('button');
        deleteb.textContent='x';
        // we need:<button class="delete-btn">x</button> and classList <=> class=""
        deleteb.classList.add('delete-btn'); // to let the listener recognize the delete button
        //list.dataset.index = index; // save index for each element
        list.dataset.id = task.id; //id instead of index cause when we delete smth id dont shift
        if (task.completed) {
            list.classList.add('completed'); // edit css
        }
        task_list.append(list); // so its like adding to div
        list.append(inputs, span, deleteb); // added in li checkbox, text and delete button
    })
}
function addTask() {
    const text = task_input.value.trim(); // we trim to remove any blank space,
    if (text === '') {
    alert('Task cannot be empty!');
    return;
  } //check if my text is empty after checking for the spaces after removing them or if i didnt input anything
    const task = {
    id: Date.now(),
    text: text,
    completed: false
  }; // this is my tasks elements
    tasks.push(task);//added it to my list of task in the array
    task_input.value = ''; //clear the textarea back to empty
    saveTasks(); // added this line to save after every change
    renderTasks();// re-erase everything inside and rebuild it, so it includes the new task too
}

//function for completed tasks
function toggleTask(id) {
    tasks = tasks.map((task) => { //  create a new array tasks , where now will have the task that has been completed
        if (task.id === id) { // if the id of the task is the id given so the task is completed
            return { ...task, completed: !task.completed }; 
        }
        return task; // leave the other tasks the same
    });
    saveTasks();
    renderTasks();
}

//function for deleted tasks
function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id); //on a new array will remove the task with the id and keep them, cause gonna fetch every element that has an id different than the one we input
    saveTasks();
    renderTasks();
}

// add one listener on the list o will know when to delete or say its completed
task_list.addEventListener('click', (event) => {
    const li = event.target.closest('li'); // find the <li> that contains whatever was clicked
    if (!li) return; // click landed on empty space in the <ul>
    const id = Number(li.dataset.id); // dataset values are strings, ids in the array are numbers

    if (event.target.classList.contains('delete-btn')) { // found class="delete btn"
        deleteTask(id);
    } else if (event.target.type === 'checkbox') { // found the checkbox we added means it was completed
        toggleTask(id);
    }
});

const addButton = document.querySelector('.add_task button');//class in html
addButton.addEventListener('click', addTask); //event listener
task_input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
            event.preventDefault(); //to not insert a new line and be able to use the add Task function
            addTask();
  }
});

renderTasks(); // initial render so saved tasks show up when the page loads

