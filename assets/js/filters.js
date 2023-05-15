// Variables 
import { list } from "./variables.js";
import { allTasks } from "./tasks.js";

// Fonctions
import { createListItem } from "./create.js";

//Filtre "Todo"
export function todoFilter() {
	list.innerHTML = "";
	allTasks.forEach((task) => {
		let divTodo = document.createElement("div");
		if (task.state == "todo") {
            divTodo = createListItem(task);
		}
		list.appendChild(divTodo);
	});
}

//Filtre "Doing"
export function doingFilter() {
	list.innerHTML = "";
	allTasks.forEach((task) => {
		let divDoing = document.createElement("div");
		if (task.state == "doing") {
            divDoing = createListItem(task);
		}
		list.appendChild(divDoing);
	});
}

// Filtre "done"
export function doneFilter() {
	list.innerHTML = "";
	allTasks.forEach((task) => {
		let divDone = document.createElement("div");
		if (task.state == "done") {
            divDone = createListItem(task);
		}
		list.appendChild(divDone);
	});
}

// Filtre "jours"
export function daysFilter(){
	list.innerHTML = "";
	allTasks.sort(function(a, b) {
		const dateA = new Date(a.dueDate);
		const dateB = new Date(b.dueDate);
		return dateA - dateB;
	});

	allTasks.forEach((task) => {
		let divDays = document.createElement("div");
		divDays = createListItem(task);
		list.appendChild(divDays);
	});
}