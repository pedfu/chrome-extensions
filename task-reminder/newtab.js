// ver se o  input value eh nulo, se for, nao adiconar
document.addEventListener("DOMContentLoaded", async () => {
    let taskList = [];
    const taskUL = document.querySelector("ul.todo-list");
    
    taskList = await fetchTaskData();
    displayTaskItems();

    const form = document.querySelector("form#form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewTask(e);
    })

    const addIcon = document.querySelector(".addTask");
    addIcon.addEventListener("click", () => form.firstElementChild.focus());

    const titleh2 = document.querySelector("#title");
    getTitle()
    titleh2.ondblclick = () => {
        let val = titleh2.innerHTML;
        let input = document.createElement("input");
        input.value = val;
        input.onblur = () => {
            titleh2.innerHTML = input.value.toUpperCase();
            // function to save the title
            saveTitle(titleh2.innerHTML)
        }
        titleh2.innerHTML = "";
        titleh2.appendChild(input);
        input.focus();
    }

    async function displayTaskItems() {
        taskUL.innerHTML = '';

        taskList.map((task, id) => {
            const li = document.createElement("li");
            const checkbox = document.createElement("input");
            const p = document.createElement("p");
            const img = document.createElement("img");
            const div = document.createElement("div");

            div.appendChild(p);
            div.appendChild(img);

            li.setAttribute('class', 'todo-item flex');
            li.appendChild(checkbox);
            li.appendChild(div);

            div.setAttribute("class", "flex actions");

            p.innerText = task?.task;
            p.ondblclick = () => {
                let pval = p.innerHTML;
                let input = document.createElement("input");
                input.value = pval;
                input.onblur = () => {
                    let inputval = input.value;
                    p.innerHTML = inputval;
                    editTask(id, pval, p.innerHTML);
                }
                p.innerHTML = "";
                p.appendChild(input);
                input.focus();
            }

            checkbox.setAttribute('type', 'checkbox')
            checkbox.setAttribute('name', 'checkbox')
            checkbox.setAttribute('class', 'checkbox')
            checkbox.setAttribute('id', 'checkbox-'+id)

            checkbox.addEventListener("click", () => {
                if( checkbox.checked ) {
                    p.style.textDecoration = "line-through";
                    div.style.opacity = "0.8";
                } else {
                    p.style.textDecoration = "none";
                    div.style.opacity = "1";
                }
            })

            img.setAttribute("src", "delete.png");
            img.setAttribute("width", "20px");
            img.setAttribute("height", "20px");
            img.setAttribute("class", "deleteIcon");

            img.addEventListener("click", () => {
                deleteTask(id);
            })

            taskUL.appendChild(li);
        })
    }

    function editTask(taskId, oldTask, newTask) {
        taskList = taskList.map((task, id) => {
            if(id === taskId && task.task === oldTask) {
                return {
                    task: newTask
                }
            }
            return task;
        });
        saveTaskList();
        displayTaskItems();
    }

    function deleteTask(taskId) {
        taskList = taskList.filter((task, id) => id !== taskId);
        saveTaskList();
        displayTaskItems();
    }

    function addNewTask(e) {
        const task = e.target.firstElementChild.value;
        const newTask = {task};
        taskList.push(newTask);

        e.target.firstElementChild.value = '';
        e.target.childNodes[3].value = '';

        saveTaskList();
        displayTaskItems();
    }

    function saveTitle(title) {
        chrome.storage.sync.set({
            'title': title
        })
    }

    async function getTitle() {
        const title = await fetchTitle();
        titleh2.innerHTML = title ? title : "TODAY'S TASK - undefined";
    }

    function saveTaskList() {
        chrome.storage.sync.set({
            'tasks': JSON.stringify(taskList)
        })
    }

    function fetchTaskData() {
        return new Promise((resolve) => {
            chrome.storage.sync.get('tasks', (result) => {
                resolve(result['tasks'] ? JSON.parse(result['tasks']) : [])
            })
        })
    }

    function fetchTitle() {
        return new Promise((resolve) => {
            chrome.storage.sync.get('title', (result) => {
                resolve(result['title'] ? result['title'] : "TODAY'S TASK");
            })
        })
    }


});
// quando DOMloaded, pegar array com tasks do chrome.storage e display