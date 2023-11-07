// taskCreation.js
import { tasksContainer, taskForm, taskTitle, taskDetails, cancelTaskButton, submitTaskButton, addTaskButton, editTaskForm } from "./domManip.js"
import { projects, selectedProjectId, saveAndRender } from "./storage.js"
import { openPopup } from "./popup.js"

export function showTaskForm() {
    addTaskButton.addEventListener('click', e => {
        taskForm.classList.remove("hidden")
        editTaskForm.classList.add("hidden")
    })
}

export function hideTaskForm() {
    taskForm.classList.add("hidden")
}

cancelTaskButton.addEventListener('click', e => {
    hideTaskForm()
})

export function addNewTask() {
    submitTaskButton.addEventListener('click', e => {
        e.preventDefault()
        let title = taskTitle.value
        let details = taskDetails.value
        let date = document.getElementById('listInputDate').value

        if (title == null || title === '') {
            alert("Enter a title for your new task!")
        } else if (title.length > 20) {
            alert("Task title is too long! Maximum characters allowed is 20.")
        } else {
            const task = createTask(title, details, date)
            const selectedProject = projects.find(project => project.id === selectedProjectId)
            selectedProject.tasks.push(task)
            taskDetails.value = null
            taskTitle.value = null
            saveAndRender()
            hideTaskForm()
    
            openPopup(popup, title, details, date)
        }
    })
}

tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedProject = projects.find(project => project.id === selectedProjectId)
        const selectedTask = selectedProject.tasks.find(task => task.id === e.target.id)
        selectedTask.complete = e.target.checked
        saveAndRender()
    }
})

export function createTask(title, details, date) {
    return { id: Date.now().toString(), title: title, details: details, date: date, complete: false }
}