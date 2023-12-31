// editTask.js
import { tasks, tasksContainer, editTaskForm, cancelEditTaskButton, submitEditTaskButton, taskEditTitle, taskEditDetails, taskTemplate, taskEditDate } from "./domManip.js"
import { deleteTask } from "./index.js"
import { saveAndRender, selectedProjectId, projects } from "./storage.js"
import { createTask, hideTaskForm } from "./taskCreation.js"

document.addEventListener('DOMContentLoaded', function() {
    const editTaskButtons = document.querySelectorAll('[data-edit-task-button]')
    
    editTaskButtons.forEach(button => {
        button.addEventListener('click', e => {
            editTaskForm.classList.remove("hidden")
        })
    })
})

let oldTask = null

export function editTaskFormFunction() {
    document.addEventListener('DOMContentLoaded', () => {
        const editTaskButtons = document.querySelectorAll('[data-edit-task-button]')

        editTaskButtons.forEach(button => {
            button.addEventListener('click', () => {
                hideTaskForm()

                const task = button.closest('.task')
                const detailsDiv = task.querySelector('[data-details-space]')
                const body = detailsDiv.textContent
                const detailsInput = document.querySelector('[data-edit-details-input]')

                const taskTitle = task.querySelector('label').textContent.trim()
                const titleInput = document.querySelector('[data-edit-title-input]')

                // Get the task's date and set it in the date input field
                const dateDiv = task.querySelector('[data-date-space]')
                const date = dateDiv.textContent
                const dateInput = document.querySelector('[data-edit-date-input]')
                dateInput.value = date

                titleInput.value = taskTitle
                detailsInput.value = body

                oldTask = task
            })
        })
    })
}

export function hideEditTaskForm() {
    editTaskForm.classList.add("hidden")
}

cancelEditTaskButton.addEventListener('click', e => {
    hideEditTaskForm()
})

export function changeTask() {
    submitEditTaskButton.addEventListener('click', e => {
        e.preventDefault()

        const updatedTitle = taskEditTitle.value
        const updatedDetails = taskEditDetails.value
        const updatedDate = taskEditDate.value

        if (updatedTitle == null || updatedTitle === '') {
            alert("Enter a title for your task!")
        } else if (updatedTitle.length > 20) {
            alert("Task title is too long! Maximum title should be 20 characters.")
        } else {
            const newTask = createTask(updatedTitle, updatedDetails, updatedDate)
            const selectedProject = projects.find(project => project.id === selectedProjectId)

            // Check if oldTask is defined and remove it from the selectedProject's tasks
            if (oldTask) {
                const taskIndex = Array.from(oldTask.parentElement.children).indexOf(oldTask)
                selectedProject.tasks.splice(taskIndex, 1)
            }

            selectedProject.tasks.push(newTask)

            // Reset oldTask to null for the next edit
            oldTask = null

            saveAndRender()
            hideEditTaskForm()
        }
    })
}