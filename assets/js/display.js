// Variables
import { list } from "./variables.js";
import { allTasks } from "./tasks.js";


// Fonctions
import { createListItem } from "./create.js";

// Affiche la liste de toutes les tâches
export function displayAllTasks(){
	// Vider le contenu du conteneur de liste
	list.innerHTML = "";
	allTasks.forEach(function (task){
		let listItem = createListItem(task);
		list.appendChild(listItem);
	});
}

// Mettre à jour la liste des tâches dans le stockage local
export function updateTasks(){
    // Enregistrer les tâches dans le stockage local
    localStorage.setItem("TASKS", JSON.stringify(allTasks));
    // Réafficher toutes les tâches
    displayAllTasks();
}