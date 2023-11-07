// render.js
import { projectsContainer, projectDisplayContainer, projectTitle, tasksContainer, taskTemplate } from "./domManip.js"
import { projects, selectedProjectId } from "./storage.js"
import { clearElement } from "./clearElement.js"

export function render() {
    clearElement(projectsContainer);
    renderProjects();

    // Hide to-do list unless a project is selected
    const selectedProject = projects.find(project => project.id === selectedProjectId);
    if (selectedProjectId == null) {
        projectDisplayContainer.style.display = 'none';
    } else {
        projectDisplayContainer.style.display = '';
        projectTitle.innerText = selectedProject.name;
        clearElement(tasksContainer);
        renderTasks(selectedProject);
    }
}

function renderProjects() {
    projects.forEach(project => {
        const projectElement = document.createElement('li');
        projectElement.dataset.projectId = project.id;
        projectElement.classList.add("project-name");
        projectElement.innerText = project.name;
        if (project.id === selectedProjectId) {
            projectElement.classList.add('active-project');
        }
        projectsContainer.appendChild(projectElement);
    });
}

function renderTasks(selectedProject) {
    selectedProject.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input');
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        const label = taskElement.querySelector('label');
        label.htmlFor = task.id;
        const detailsLabel = taskElement.querySelector('[data-details-space]');
        detailsLabel.classList.add("hidden");
        label.append(task.title);
        detailsLabel.append(task.details);

        const dateLabel = taskElement.querySelector('[data-date-space]')
        dateLabel.classList.add("hidden")
        dateLabel.append(task.date)
        

        tasksContainer.appendChild(taskElement);
    });
}
