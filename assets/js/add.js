// Variables
import { list } from "./variables.js";
import { allTasks } from "./tasks.js";


// Fonctions
import { updateTasks } from "./display.js";
import { createListItem } from "./create.js";

// Récupérer l'id le plus élevé du tableau
function getMaxId(){
    let newId = 0;
    if(allTasks.length > 0){
        allTasks.forEach(task => {
            if(task.id > newId){
                newId = task.id;
            }
        });
        return newId+1;
    }
    return newId;
}

// Ajoute la tâche à la liste
export function addTask(task){
    // Empêcher le comportement par défaut du formulaire (recharger la page)
    task.preventDefault();

	// Empecher un input vide
	let inputLab = document.getElementById("formContainer__form--task").value;
	let inputDesc = document.getElementById("formContainer__form--description").value;
	if (inputLab.trim() === "" || inputDesc.trim() === "") {
		alert("Veuillez saisir une tâche complète");
		return;
	}

    // Création de l'objet task
    let newTask = new Object();
    newTask.id = getMaxId(); 
    newTask.label = task.target.label.value;
    newTask.description = task.target.description.value;
    newTask.state = "todo";
    newTask.dueDate = new Date(task.target.date.value);
	// Ajouter la nouvelle tache au tableau
	allTasks.push(newTask);


	// ajout du li au ul (html)
	let listItem = createListItem(newTask);
	list.appendChild(listItem);

    // Effacer les informations des champs de saisie
    document.getElementById("formContainer__form--task").value = "";
    document.getElementById("formContainer__form--description").value = "";
    document.getElementById("formContainer__form--date").valueAsDate = new Date();
    updateTasks();
}