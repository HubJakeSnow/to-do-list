import { tasksContainer, taskForm, taskTitle, taskDetails, cancelTaskButton, submitTaskButton, addTaskButton } from "./domManip.js"
import { projects, selectedProjectId, saveAndRender } from "./storage.js"
import { openPopup } from "./popup.js"

export function showTaskForm() {
    addTaskButton.addEventListener('click', e => {
        taskForm.classList.remove("hidden")
    })
}

function hideTaskForm() {
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
        if (title == null || title === '') {
            alert("Enter a title for your new task!")
        } else {
            const task = createTask(title, details)
            const selectedProject = projects.find(project => project.id === selectedProjectId)
            selectedProject.tasks.push(task)
            taskDetails.value = null
            taskTitle.value = null
            saveAndRender()
            hideTaskForm()

            openPopup(popup, title, details)
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


export function createTask(title, details) {
    return { id: Date.now().toString(), title: title, details: details, complete: false }
}