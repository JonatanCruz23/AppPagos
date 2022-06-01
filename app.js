document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {


    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let consumo = document.getElementById('consumo').value;
    let metrosC = parseInt(consumo);
    let total = metrosC * 0.05;
    total = total.toFixed(2)

    console.log(metrosC)

    const task = {
        title,
        description,
        metrosC,
        total
    }


    if (localStorage.getItem('tasks') === null) {
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getTasks();
    document.getElementById('formTask').reset();
    e.preventDefault();

}

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;
        let metros = tasks[i].metrosC
        let total = tasks[i].total


        tasksView.innerHTML += `<div class='card mt-3'>
        <div class='card-body' style="background-color: #ccc;">
             <h5>Nombre: ${title}
              - Total a pagar: $${total}
              - Descripción: ${description} </h5> <br/>
             <a class='btn btn-danger' href='#' onclick="deleteTask('${title}')">
             Delete
             </a>
            </div>
        </div>
        `
    }

}

function deleteTask(title) {
    console.log(title);
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title == title) {
            tasks.splice(i, 1);

        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

getTasks();