// Variables
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
import { allTasks } from "./tasks.js";

// Fonctions
// Calcule le nombre de jours restants
function remainingDays(dateString){
    let date = new Date(dateString);
    let remainingDays = 0;
    let todayDate = new Date();
    if(todayDate.getFullYear() === date.getFullYear()){
        if(todayDate.getMonth() === date.getMonth()){
            if(date.getDate() < todayDate.getDate()){
                return -1;
            }else{
                remainingDays = date.getDate() - todayDate.getDate();
            }
        }else{
            let monthsGap = date.getMonth() - todayDate.getMonth();
            if(monthsGap < 0){
                return -1;
            }else{
                for(let i = 0; i < monthsGap; i++){
                    remainingDays += months[todayDate.getMonth() + i];
                }
                if(date.getDate() < todayDate.getDate()){
                    remainingDays -= (todayDate.getDate() - date.getDate());
                }else{
                    remainingDays += (date.getDate() - todayDate.getDate());
                }
            }
        }
    }else if(todayDate.getFullYear() < date.getFullYear()){
        let yearsGap = date.getFullYear() - todayDate.getFullYear();
        remainingDays = 365*yearsGap;
        if(todayDate.getMonth() === date.getMonth()){
            remainingDays += date.getDate() - todayDate.getDate();
        }else{
            let monthsGap = date.getMonth() - todayDate.getMonth();
            if(monthsGap < 0){
                monthsGap = todayDate.getMonth() - date.getMonth(); // 3
                for(let i = 1; i <= monthsGap; i++){
                    remainingDays -= months[todayDate.getMonth() - i];
                }
                remainingDays += (date.getDate() - todayDate.getDate());
            }else{
                for(let i = 0; i < monthsGap; i++){
                    remainingDays += months[todayDate.getMonth() + i];
                }
                remainingDays += (date.getDate() - todayDate.getDate());
            }
        }
    }else{
        return -1;
    }
    return remainingDays;
}

export function createListItem(task){
    // Création élément liste (div) 
    let listItem = document.createElement("div");
    listItem.setAttribute("class", "card " + task.id);
    let taskLabel = document.createElement("span");
    taskLabel.textContent = task.label;
    let taskDescription = document.createElement("p");
    taskDescription.textContent = task.description;
    let taskDays = document.createElement("p");
    if(remainingDays(task.dueDate) == -1){
        taskDays.textContent = "Due date passed"
    }else if(remainingDays(task.dueDate) <= 1 && remainingDays(task.dueDate) >= 0){
        taskDays.textContent = remainingDays(task.dueDate) + " Day left";
    }else{
        taskDays.textContent = remainingDays(task.dueDate) + " Days left";
    }
    
    // Création des radio box
    let rbDiv = document.createElement("div");
    rbDiv.setAttribute("class", "radioBox " + task.id);
    let todoRb = document.createElement("input");
    todoRb.type = "radio";
    todoRb.name = "radioState " + task.id;
    let todoLab = document.createElement("label");
    todoLab.appendChild(document.createTextNode("To Do"));
    let doingRb = document.createElement("input");
    doingRb.type = "radio";
    doingRb.name = "radioState " + task.id;
    let doingLab = document.createElement("label");
    doingLab.appendChild(document.createTextNode("Doing"));
    let doneRb = document.createElement("input");
    doneRb.type = "radio";
    doneRb.name = "radioState " + task.id;
    let doneLab = document.createElement("label");
    doneLab.appendChild(document.createTextNode("Ended"));

    // Valeur par défaut de la radio box
    if(task.state != null){
        if(task.state == "todo"){
            todoRb.checked = true;
        }else if(task.state == "doing"){
            doingRb.checked = true;
        }else{
            doneRb.checked = true;
        }
    }else{
        todoRb.checked = true;
    }

	// Ajout d'évènements aux radio box
	todoRb.addEventListener("change", function () {
		task.state = "todo";
        localStorage.setItem("TASKS", JSON.stringify(allTasks));
	});
	doingRb.addEventListener("change", function () {
		task.state = "doing";
        localStorage.setItem("TASKS", JSON.stringify(allTasks));
	});
	doneRb.addEventListener("change", function () {
		task.state = "done";
        localStorage.setItem("TASKS", JSON.stringify(allTasks));
	});

	// Création du bouton delete
	let button = document.createElement("button");
	button.setAttribute("class", "but " + task.id);
    button.innerHTML = `<img src="./assets/img/poubelle.svg">`;
	// button.appendChild(document.createTextNode("Supprimer"));
	button.addEventListener("click", function () {
		listItem.remove();
		// Supprimer la tâche du tableau (allTasks)
		let deletedTaskIndex = allTasks.findIndex((t) => t.id === task.id);
		if (deletedTaskIndex !== -1) {
			allTasks.splice(deletedTaskIndex, 1);
            localStorage.setItem("TASKS", JSON.stringify(allTasks));
		}
	});

	// Ajouter les radio box à la div
	rbDiv.appendChild(todoRb);
    rbDiv.appendChild(todoLab);
	rbDiv.appendChild(doingRb);
    rbDiv.appendChild(doingLab);
	rbDiv.appendChild(doneRb);
    rbDiv.appendChild(doneLab);

	// Ajouter tous les éléments à la div
	listItem.appendChild(taskLabel);
	listItem.appendChild(taskDescription);
	listItem.appendChild(taskDays);
	listItem.appendChild(rbDiv);
	listItem.appendChild(button);

	return listItem;
}