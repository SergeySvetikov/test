const TASK_CONTAINER_SELECTOR = '#tasks'
const INPUT_CONTAINER_SELECTOR = '#newtask input'

document.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    if (tasks) {
        tasks.forEach((item) => {
            document.querySelector(TASK_CONTAINER_SELECTOR).appendChild(createElement(item.title, item.isDone))
        })
    }
    document.querySelector('#push').addEventListener('click', addTask)
    document.querySelector(INPUT_CONTAINER_SELECTOR).addEventListener('keydown', function (e) {
        // press enter
        if (e.keyCode === 13) {
            addTask()
        }
    })
})

function createElement(value, isChecked = false) {
    const newTaskElement = document.createElement('div')

    newTaskElement.innerHTML = `<div class="task">
        <input class="check" type='checkbox' ${isChecked && 'checked'}/>
        <span class="taskname">
            ${value}
        </span>
        <button class="delete">&#10006</button >
    </div > `

    newTaskElement.querySelector('.delete').onclick = () => deleteTask(newTaskElement, value)
    newTaskElement.querySelector('.check').onclick = (e) => onCheckBoxClick(e.target.checked, value)
    return newTaskElement
}

function addTask() {
    const addInput = document.querySelector(INPUT_CONTAINER_SELECTOR)
    if (addInput) {
        const value = addInput.value
        if (value.length == 0) {
            alert("Please Enter a Task")
        }
        else {
            document.querySelector(TASK_CONTAINER_SELECTOR).appendChild(createElement(value))
            const previosTasks = JSON.parse(localStorage.getItem('tasks'))
            const newTask = { title: value, isDone: false }
            const tasksToStorage = previosTasks ? [...previosTasks, newTask] : [newTask]

            localStorage.setItem('tasks', JSON.stringify(tasksToStorage))
            addInput.value = ''
        }
    }
}

function deleteTask(element, value) {
    const parent = element.parentNode
    parent.removeChild(element)
    const tasksInStorage = JSON.parse(localStorage.getItem('tasks'))

    if (tasksInStorage) {
        const newTaskList = tasksInStorage.filter((item) => item.title !== value)
        localStorage.setItem('tasks', JSON.stringify(newTaskList))
    }
}

function onCheckBoxClick(isChecked, title) {
    const tasksInStorage = JSON.parse(localStorage.getItem('tasks'))

    if (tasksInStorage) {
        const newTaskList = tasksInStorage.map((item) => {
            if (item.title === title) {
                return {
                    ...item,
                    isDone: isChecked
                }
            }
            return item
        })
        localStorage.setItem('tasks', JSON.stringify(newTaskList))
    }
}
