// popup.js
import { closePopupButtons, overlay, taskTitle } from "./domManip.js"

export function openPopup(popup, title, body, date) {
    if (popup == null) return;
    const popupTitle = popup.querySelector('[data-popup-title]');
    const popupBody = popup.querySelector('[data-popup-body]');
    const popupDate = popup.querySelector('[data-popup-date]');
    popupTitle.textContent = title;
    popupBody.textContent = body;
    popupDate.textContent = date;
    popup.classList.add('active');
    overlay.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const openPopupButtons = document.querySelectorAll('[data-popup-target]');

    openPopupButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Find the parent task element of the clicked button
            const task = button.closest('.task');

            // Get the details content from the task
            const detailsDiv = task.querySelector('[data-details-space]');
            const body = detailsDiv.textContent;

            // Get the task title
            const taskTitle = task.querySelector('label').textContent;

            // Get the task date
            const dateDiv = task.querySelector('[data-date-space]')
            const date = dateDiv.textContent


            // Open the popup with the task title, details, and date on task creation
            openPopup(popup, taskTitle, body, date);
        });
    });
});

overlay.addEventListener('click', () => {
    const popups = document.querySelectorAll('.popup.active');
    popups.forEach(popup => {
        closePopup(popup);
    });
});

export function closePopup(popup) {
    if (popup == null) return;
    popup.classList.remove('active');
    overlay.classList.remove('active');
}

closePopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        closePopup(popup);
    });
});
