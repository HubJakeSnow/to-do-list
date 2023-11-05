// projectCreation.js
import { projectsContainer, newProjectForm, newProjectInput } from "./domManip.js"
import { projects, saveAndRender, selectedProjectId } from "./storage.js"

projectsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li' ) {
       selectedProjectId = e.target.dataset.projectId
       saveAndRender() 
    }
})

newProjectForm.addEventListener('submit', e => {
    e.preventDefault() // Stops page from refreshing
    const projectName = newProjectInput.value
    if (projectName == null || projectName === '') return
    const project = createProject(projectName)
    newProjectInput.value = null
    projects.push(project)
    saveAndRender()
})

export function createProject(name) {
    return { id: Date.now().toString(), name: name, tasks: [] }
}