const tasks = [
  { id: 1, text: "Buy groceries", completed: false },
  { id: 2, text: "Finish assignment", completed: false }
]; //created an array of task that is known with an id, what is the task and if its completed

const tasklist=document.getElementById('task_list'); 
function renderTasks() { // to avoid duplicates
    taskList.innerHTML = ''; //erase everything inside the <ul> with the id task list 
}

tasks.forEach((input,index) =>{
    const list=document.createElement('li'); // li is a tab so we u create he will know that u mean to create <li>
    list.textContent=input.text
    list.dataset.index = index; // save index for each element
    task_list.append(list); // so its like adding to div
})

function addTask() {
    const text = new_task.value.trim(); // we trim to remove any blank space,
    if (text === '') {
    alert('Task cannot be empty!');
    return;
  } //check if my text is empty after checking for the spaces ad removing them
    const task = {
    id: Date.now(),
    text: text,
    completed: false
  }; // this is my tasks elements
    tasks.push(task);//added it to my list of task in the array
    new_task.value = ''; //clear the textarea back to empty
    renderTasks();// re-erase everything inside so we dont duplicate when we add a new one the old elemnets
}

