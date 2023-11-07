// index.js
import { deleteProjectButton, clearCompletedTasksButton, tasksContainer } from "./domManip.js"
import { saveAndRender, projects, selectedProjectId } from "./storage.js"
import { render } from "./render.js"
import { showTaskForm, createTask, addNewTask } from "./taskCreation.js"
import { createProject } from "./projectCreation.js"
import { editTaskFormFunction, changeTask, hideEditTaskForm } from "./editTask.js"
import { format } from "date-fns"

clearCompletedTasksButton.addEventListener('click', e => {
    const selectedProject = projects.find(project => project.id === selectedProjectId)
    selectedProject.tasks = selectedProject.tasks.filter(task => !task.complete)
    saveAndRender()
})

deleteProjectButton.addEventListener('click', e => {
    projects = projects.filter(project => project.id !== selectedProjectId)
    selectedProjectId = null
    saveAndRender()
})

// Delete task EL
export function deleteTask() {
    tasksContainer.addEventListener('click', (e) => {
        if (e.target.matches('[data-delete-task-button]')) {
            const selectedTask = e.target.parentElement
            const selectedProject = projects.find(project => project.id === selectedProjectId)
            const taskIndex = Array.from(selectedTask.parentElement.children).indexOf(selectedTask)
            selectedProject.tasks.splice(taskIndex, 1)
            tasksContainer.removeChild(selectedTask)
            hideEditTaskForm()
            saveAndRender()
        }
    })
}


createTask()
showTaskForm()
editTaskFormFunction()
changeTask()
render()
addNewTask()
createProject()
saveAndRender()
deleteTask()