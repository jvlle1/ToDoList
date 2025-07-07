function addTask() {
    // gets the user input with the class inputTask
    const input = document.querySelector(".inputTask");
    // gets the ul list on the html
    const list = document.querySelector(".taskList");

    // empty (li) to represent the new tasks
    const li = document.createElement("li")
    // the value user inputted is assigned to the li
    li.textContent = input.value;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Task";
    deleteBtn.className = "deleteTask";
    // when button is clicked, runs the deleteTask function
    deleteBtn.addEventListener("click", deleteTask ); 

    const markDoneBtn = document.createElement("button");
    markDoneBtn.textContent = "Task Done"
    markDoneBtn.className = "taskDone";
    markDoneBtn.addEventListener("click", doneTask);

    // inserts in individual task item
    li.appendChild(deleteBtn);
    li.appendChild(markDoneBtn);
    // append the new list item to the task list
    list.appendChild(li);

    input.value = ""; // clears input value to add a new one
}

function deleteTask(event) {
    // refers to the element (button) that triggered the event.
    const button = event.target; 
    // removes the parent element of that button which is the task (li)
    const li = button.parentElement;    
    li.remove();
}

function doneTask(event) {
    const button = event.target;
    const li = button.parentElement;

    // adds a css style to the element (li)
    // shows and hides the style using toggle
    const marked = li.classList.toggle("markedDone");

    // using tenary operator
    // checks if the element has been marked done
    button.textContent = marked ? "Undo" : "Task Done"; 
}