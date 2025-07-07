const form = document.getElementById("userForm");

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskInput = document.querySelector(".inputTask");
    const message = document.querySelector(".errorMsg");

    // input validation the input
    if (taskInput.value.trim() === '' || taskInput.value == null) {
        message.textContent = "Input required";
    } else {
        message.textContent = "";
        addTask(taskInput.value.trim());
        taskInput.value = ""; 
    }
})

function addTask(taskText) {
    const list = document.querySelector(".taskList");
    // empty (li) to represent the new tasks
    const li = document.createElement("li")

    const taskSpan = document.createElement("span");
    taskSpan.className = "taskText";
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);


    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button"
    deleteBtn.textContent = "Delete Task";
    deleteBtn.className = "deleteTask";
    deleteBtn.addEventListener("click", deleteTask ); 

    const markDoneBtn = document.createElement("button");
    markDoneBtn.type = "button";
    markDoneBtn.textContent = "Task Done"
    markDoneBtn.className = "taskDone";
    markDoneBtn.addEventListener("click", doneTask);

    // inserts in individual task item
    li.appendChild(deleteBtn);
    li.appendChild(markDoneBtn);

    // append the new list item to the task list
    list.appendChild(li);
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