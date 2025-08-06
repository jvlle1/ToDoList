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
    
    const buttonGroup = document.createElement("div");
    buttonGroup.className = "button-grp";
    const taskGroup = document.createElement("div");
    taskGroup.className = "task-grp";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";

    // delete icon added on the button
    const deleteIcon = document.createElement("ion-icon");
    deleteIcon.setAttribute("name", "trash-outline");   
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.addEventListener("click", deleteTask); 


    const label = document.createElement("label");
    label.className = "chckbox-label";

    const markDoneBtn = document.createElement("input");
    markDoneBtn.type = "checkbox";
    markDoneBtn.className = "done-btn";
    markDoneBtn.addEventListener("click", doneTask);
    label.appendChild(markDoneBtn)

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    // edit icon added on the button 
    const editIcon = document.createElement("ion-icon");
    editIcon.setAttribute("name", "create-outline");
    editBtn.appendChild(editIcon);

    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", editTask);

    buttonGroup.appendChild(deleteBtn);
    buttonGroup.appendChild(editBtn);

    taskGroup.appendChild(label);
    taskGroup.appendChild(taskSpan);
    
    // inserts in individual task item
    li.appendChild(taskGroup);
    li.appendChild(buttonGroup);
       
    // append the new list item to the task list
    list.appendChild(li);
}

function deleteTask(event) {
    // refers to the element (button) that triggered the event.
    const button = event.currentTarget; 
    // removes the parent element of that button which is the task (li)
    const li = button.closest("li");    
    li.remove();
}

function doneTask(event) {
    const checkbox = event.currentTarget;
    // finds the closest (li) in structure
    const li = checkbox.closest("li");

    // adds a css style to the element (li)
    // shows and hides the style using toggle
    const marked = li.classList.toggle("markedDone");

    const inProgress = document.querySelector(".task-progress");
    const done  = document.querySelector(".task-done");

    // moves the task into the right category
    if (marked) {
        done.appendChild(li);
    }
    else {
        inProgress.appendChild(li);
    }

    deleteAllButton(); 
}

function editTask(event) {
    const button = event.currentTarget;
    const li = button.closest("li");
    const taskSpan = li.querySelector(".taskText");

    // create an input box to replace the task text so the user can edit it
    const itemInput = document.createElement("input");
    itemInput.type = "text";
    itemInput.value = taskSpan.textContent;
    itemInput.classList.add("edit-txtbox");

    // replace span with input
    taskSpan.parentElement.replaceChild(itemInput, taskSpan);

    itemInput.addEventListener("keypress", function (e) {
        // checks if the eneter key was pressed 
        if (e.key === "Enter") {
            saveItem(e, li);
        }
    });
}

function saveItem(event, li) {
    // get the input directly from the li
    const input = li.querySelector(".edit-txtbox"); 
    const inputValue = input.value.trim();

    if (inputValue.length > 0) {
        const taskSpan = document.createElement("span");
        taskSpan.className = "taskText";
        taskSpan.textContent = inputValue;

        li.querySelector(".task-grp").replaceChild(taskSpan, input);
    }
}

function deleteAllButton() {
    const taskDoneGrp = document.querySelector(".task-done");

    // checks if there is an existing buttong and removes it
    const existingBtn = taskDoneGrp.querySelector(".delete-all-btn");
    if (existingBtn) existingBtn.remove();

    const tasks = taskDoneGrp.querySelectorAll("li");

    // checks if the tasks on the done section has more than 1 tasks in 
    if (tasks.length > 1) {
        const deleteAllBtn = document.createElement("button");
        deleteAllBtn.className = "delete-all-btn";
        deleteAllBtn.textContent = "Delete All";

        deleteAllBtn.addEventListener("click", () => {
            // goes through each task on the list and removes it
            tasks.forEach(task => task.remove());
            deleteAllBtn.remove();
        });

        taskDoneGrp.appendChild(deleteAllBtn);
    }
}

