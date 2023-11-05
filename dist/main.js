(()=>{"use strict";const e=document.querySelector("[data-lists]"),t=document.querySelector("[data-new-project-form]"),n=document.querySelector("[data-new-project-input]"),a=document.querySelector("[data-delete-list-button]"),d=document.querySelector("[data-project-display-container]"),c=document.querySelector("[data-project-title]"),l=document.querySelector("[data-tasks]"),o=document.getElementById("task-template"),r=document.querySelector("[data-clear-comepleted-tasks-button]"),i=document.querySelector("[data-new-task-button]"),s=document.querySelector("[data-cancel-task-btn]"),u=document.querySelector("[data-submit-task-btn]"),m=document.getElementById("task-form"),p=document.getElementById("todo-input"),f=document.querySelector("[data-edit-title-input]"),y=document.querySelector("[data-edit-details-input]"),k=document.getElementById("todo-input-details"),v=document.querySelectorAll("[data-close-button]"),S=document.getElementById("overlay"),E=document.getElementById("edit-task-form"),L=document.querySelector("[data-cancel-edit-task-btn]"),q=document.querySelector("[data-submit-edit-task-btn]");function h(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function g(){h(e),I.forEach((t=>{const n=document.createElement("li");n.dataset.projectId=t.id,n.classList.add("project-name"),n.innerText=t.name,t.id===j&&n.classList.add("active-project"),e.appendChild(n)}));const t=I.find((e=>e.id===j));null==j?d.style.display="none":(d.style.display="",c.innerText=t.name,h(l),function(e){e.tasks.forEach((e=>{const t=document.importNode(o.content,!0),n=t.querySelector("input");n.id=e.id,n.checked=e.complete;const a=t.querySelector("label");a.htmlFor=e.id;const d=t.querySelector("[data-details-space]");d.classList.add("hidden"),a.append(e.title),d.append(e.details),l.appendChild(t)}))}(t))}const b="task.projects",C="task.selectedProjectId";let I=JSON.parse(localStorage.getItem(b))||[],j=localStorage.getItem(C);function x(){localStorage.setItem(b,JSON.stringify(I)),localStorage.setItem(C,j),g()}function w(e,t,n){if(null==e)return;const a=e.querySelector("[data-popup-title]"),d=e.querySelector("[data-popup-body]");a.textContent=t,d.textContent=n,e.classList.add("active"),S.classList.add("active")}function D(e){null!=e&&(e.classList.remove("active"),S.classList.remove("active"))}function A(){m.classList.add("hidden")}function O(e,t){return{id:Date.now().toString(),title:e,details:t,complete:!1}}function B(e){return{id:Date.now().toString(),name:e,tasks:[]}}document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll("[data-popup-target]").forEach((e=>{e.addEventListener("click",(()=>{const t=e.closest(".task"),n=t.querySelector("[data-details-space]").textContent,a=t.querySelector("label").textContent;w(popup,a,n)}))}))})),S.addEventListener("click",(()=>{document.querySelectorAll(".popup.active").forEach((e=>{D(e)}))})),v.forEach((e=>{e.addEventListener("click",(()=>{D(e.closest(".popup"))}))})),s.addEventListener("click",(e=>{A()})),l.addEventListener("click",(e=>{"input"===e.target.tagName.toLowerCase()&&(I.find((e=>e.id===j)).tasks.find((t=>t.id===e.target.id)).complete=e.target.checked,x())})),e.addEventListener("click",(e=>{"li"===e.target.tagName.toLowerCase()&&(j=e.target.dataset.projectId,x())})),t.addEventListener("submit",(e=>{e.preventDefault();const t=n.value;if(null==t||""===t)return;const a=B(t);n.value=null,I.push(a),x()})),document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll("[data-edit-task-button]").forEach((e=>{e.addEventListener("click",(e=>{E.classList.remove("hidden")}))}))}));let N=null;function M(){E.classList.add("hidden")}L.addEventListener("click",(e=>{M()})),r.addEventListener("click",(e=>{const t=I.find((e=>e.id===j));t.tasks=t.tasks.filter((e=>!e.complete)),x()})),a.addEventListener("click",(e=>{I=I.filter((e=>e.id!==j)),j=null,x()})),O(),i.addEventListener("click",(e=>{m.classList.remove("hidden")})),document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll("[data-edit-task-button]").forEach((e=>{e.addEventListener("click",(()=>{const t=e.closest(".task"),n=t.querySelector("[data-details-space]").textContent,a=document.querySelector("[data-edit-details-input]"),d=t.querySelector("label").textContent.trim();document.querySelector("[data-edit-title-input]").value=d,a.value=n,N=t}))}))})),q.addEventListener("click",(e=>{e.preventDefault();const t=f.value,n=y.value;if(null==t||""===t)alert("Enter a title for your task!");else{const e=O(t,n),a=I.find((e=>e.id===j));if(N){const e=Array.from(N.parentElement.children).indexOf(N);a.tasks.splice(e,1)}a.tasks.push(e),N=null,x(),M()}})),g(),u.addEventListener("click",(e=>{e.preventDefault();let t=p.value,n=k.value;if(null==t||""===t)alert("Enter a title for your new task!");else{const e=O(t,n);I.find((e=>e.id===j)).tasks.push(e),k.value=null,p.value=null,x(),A(),w(popup,t,n)}})),B(),x(),l.addEventListener("click",(e=>{if(e.target.matches("[data-delete-task-button]")){const t=e.target.parentElement,n=I.find((e=>e.id===j)),a=Array.from(t.parentElement.children).indexOf(t);n.tasks.splice(a,1),l.removeChild(t),M(),x()}}))})();