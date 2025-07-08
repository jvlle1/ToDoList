// gets the date of today
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let month = String(today.toLocaleString('en-US', { month: 'long' }));

today = `${month} ${dd}`;
const dateShown = document.querySelector(".date-today")
dateShown.textContent = today;

const form = document.getElementById("user-form");

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskInput = document.querySelector(".input-task");
    const message = document.querySelector(".error-msg");

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
    const list = document.querySelector(".task-list");
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
    markDoneBtn.textContent = "Task Done";
    markDoneBtn.className = "taskDone";
    markDoneBtn.addEventListener("click", doneTask);

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "Edit Task";
    editBtn.className = "editBtn";
    editBtn.addEventListener("click", editTask);

    // inserts in individual task item
    li.appendChild(deleteBtn);
    li.appendChild(markDoneBtn);
    li.appendChild(editBtn);

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

    const inProgress = document.querySelector(".task-progress");
    const done  = document.querySelector(".task-done");

    // moves the task into the right category
    if (marked) {
        done.appendChild(li);
    }
    else {
        inProgress.appendChild(li);
    }
}

function editTask(event) {
    const button = event.target;
    const li = button.parentElement;
    const taskSpan = li.querySelector(".taskText");

    // create an input box to replace the task text so the user can edit it
    const itemInput = document.createElement("input");
    itemInput.type = "text";
    itemInput.value = taskSpan.textContent;
    itemInput.classList.add("edit");

    // replace span with input
    li.replaceChild(itemInput, taskSpan);

    itemInput.addEventListener("keypress", function (e) {
        // checks if the eneter key was pressed 
        if (e.key === "Enter") {
            saveItem(e, li);
        }
    });

}

function saveItem(event, li) {
    const inputValue = event.target.value.trim();
    if (inputValue.length > 0) {
        const taskSpan = document.createElement("span");
        taskSpan.className = "taskText";
        taskSpan.textContent = inputValue;

        // replace the task item with the new taskSpan
        li.replaceChild(taskSpan, event.target);
    }
}
