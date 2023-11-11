// popup.js
import { closePopupButtons, overlay, taskTitle } from "./domManip.js"

export function openPopup(popup, title, body, date) {
    if (popup == null) return
    const popupTitle = popup.querySelector('[data-popup-title]')
    const popupBody = popup.querySelector('[data-popup-body]')
    const popupDate = popup.querySelector('[data-popup-date]')
    popupTitle.textContent = title
    popupBody.textContent = body
    popupDate.textContent = date
    popup.classList.add('active')
    overlay.classList.add('active')
}

document.addEventListener('DOMContentLoaded', () => {
    const openPopupButtons = document.querySelectorAll('[data-popup-target]')

    openPopupButtons.forEach(button => {
        button.addEventListener('click', () => {

            const task = button.closest('.task')

            const detailsDiv = task.querySelector('[data-details-space]')
            const body = detailsDiv.textContent;

            const taskTitle = task.querySelector('label').textContent

            const dateDiv = task.querySelector('[data-date-space]')
            const date = dateDiv.textContent

            const dateKey = document.querySelector('[data-date-key]')

            if (date == null || date === '') {
                if (dateKey) {
                    dateKey.textContent = "No task date"
                }
                openPopup(popup, taskTitle, body, date)
            } else {
                dateKey.textContent = "(yyyy-mm-dd)"
                openPopup(popup, taskTitle, body, date)
            }
        })
    })
})

overlay.addEventListener('click', () => {
    const popups = document.querySelectorAll('.popup.active')
    popups.forEach(popup => {
        closePopup(popup)
    })
})

export function closePopup(popup) {
    if (popup == null) return
    popup.classList.remove('active')
    overlay.classList.remove('active')
}

closePopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup')
        closePopup(popup)
    })
})