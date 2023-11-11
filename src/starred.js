// starred.js
import { tasksContainer, starredList, projectTitle, deleteProjectButton, addTaskButton } from "./domManip.js"
import { projects, saveAndRender, selectedProjectId, save } from "./storage.js"
import { clearElement } from "./clearElement.js"
import { render } from "./render.js"
import { createTask } from "./taskCreation.js"

export function toggleStar() {
    tasksContainer.addEventListener('click', (e) => {
        if (e.target.matches('[data-star-task-button]')) {
            const selectedTask = e.target.parentElement
            const selectedProject = projects.find(project => project.id === selectedProjectId)
            const taskIndex = Array.from(selectedTask).indexOf(selectedTask)
            selectedProject.tasks.slice(taskIndex, 1)
            e.target.style.display="none"
            const fullStar = selectedTask.querySelector('[data-full-star-button]')
            fullStar.style.display="block"
            selectedTask.classList.add("starred")
            console.log("Starred:", selectedTask)
        } else {
            if (e.target.matches('[data-full-star-button]')) {
                const selectedTask = e.target.parentElement
                const selectedProject = projects.find(project => project.id === selectedProjectId)
                const taskIndex = Array.from(selectedTask).indexOf(selectedTask)
                selectedProject.tasks.slice(taskIndex, 1)
                e.target.style.display="none"
                const normalStar = selectedTask.querySelector('[data-star-task-button]')
                normalStar.style.display="block"
                selectedTask.classList.remove("starred")
                console.log("Unstarred:", selectedTask)
            }
        }
    })      
}

starredList.addEventListener('click', () => {
    console.log("Starred list clicked")
    projectTitle.textContent = "Starred"
    clearElement(tasksContainer)

    deleteProjectButton.classList.add("hidden")
    addTaskButton.classList.add("hidden")
})