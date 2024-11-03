document.addEventListener("DOMContentLoaded", () =>{
    var storeTask = JSON.parse(localStorage.getItem('task'))

    if(storeTask){
        storeTask.forEach((task) => task.push(task))
        updateTaskList()
        updateState()
    }
})

var task = [];

var saveTask = () => {
    localStorage.setItem('task', JSON.stringify(task))
}

var addTask = () => {
    var taskInput = document.getElementById('taskInput');
    var text = taskInput.value.trim();

    if (text) {
        task.push({ text: text, completed: false });
        taskInput.value = "";
        updateTaskList();
        updateState();
        saveTask();
    }
};

var toggleTaskComplete = (index) => {
    task[index].completed = !task[index].completed;
    console.log({ task });
    updateTaskList();
    updateState();
    saveTask();

};

var deleteTask = (index) =>{
    task.splice(index,1);
    updateTaskList();
    updateState();
    saveTask();

}

var editTask = (index) => {
    var taskInput = document.getElementById('taskInput')
    taskInput.value = task[index].text

    task.splice(index,1)
    updateTaskList()
    updateState();
    saveTask();

}

var updateState = () =>{
    var completedTask = task.filter(task => task.completed).length
    var totalTask = task.length
    var progress = (completedTask/totalTask)* 100

    var progressBar = document.getElementById('progress')

    progressBar.style.width = `${progress}%`

    document.getElementById('numbers').innerText = `${completedTask} / ${totalTask}`

    if(task.length && completedTask === totalTask){
        blastConfetti()
    }
}

var updateTaskList = () => {
    var taskList = document.getElementById('task')
    taskList.innerHTML = ''

    task.forEach((task, index) => {
        var taskItem = document.createElement('li')

        taskItem.innerHTML = `
        <div class = "taskItem">
        <div class = "task ${task.completed ? 'completed' : ''}">
        <input type = "checkbox" class="checkbox" ${task.completed ? 'checked' : ''}/>
        <p>${task.text}</p>
        </div>
        <div class = "icons">
        <img src = "https://img.icons8.com/m_rounded/512/FFFFFF/edit.png" onclick='editTask(${index})'/>
        <img src = "https://cdn-icons-png.flaticon.com/512/7347/7347206.png" onclick='deleteTask(${index})'/>
        </div>
        </div>
        `;
        taskItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index))
        taskList.append(taskItem);
    });
};

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault()

    addTask()
});

var blastConfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {     particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}