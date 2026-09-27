const tasks = [
  { id: 1, text: "Buy groceries", completed: false },
  { id: 2, text: "Finish assignment", completed: false }
]; //created an array of task that is known with an id, what is the task and if its completed

const tasklist=document.getElementById('task_list'); 

tasks.forEach((input,index) =>{
    const list=document.createElement('li'); // li is a tab so we u create he will know that u mean to create <li>
    list.textContent=input.text
    list.dataset.index = index;
    task_list.append(list); // so its like adding to div
})