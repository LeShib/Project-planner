// Variables
// let allTasks = [
//     {
//         id: 1,
//         label: "travailler",
//         description: "réaliser techtalk",
//         dueDate: new Date('2023-6-2'),
//         state:"todo",
//     },
//     {
//         id: 2,
//         label: "travailler2",
//         description: "réaliser techtalk2",
//         dueDate: new Date('2024-4-4'),
//         state: "todo",
//     },
//     {
//         id: 3,
//         label: "travailler3",
//         description: "réaliser techtalk3",
//         dueDate: new Date('2020-6-22'),
//         state: "doing",
//     },
//     {
//         id: 4,
//         label: "travailler4",
//         description: "réaliser techtalk4",
//         dueDate: new Date('2025-2-2'),
//         state: "done",
//     },
//     {
//         id: 5,
//         label: "travailler5",
//         description: "réaliser techtalk5",
//         dueDate: new Date('2023-5-22'),
//         state: "done",
//     }
// ];
let allTasks = JSON.parse(localStorage.getItem("TASKS")) || []; 
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
const form = document.getElementById("formContainer__form");
const list = document.getElementById("listContainer__list");
const todobtn = document.getElementById("filter__todo");
const doingbtn = document.getElementById("filter__doing");
const donebtn = document.getElementById("filter__done");
const deletebtn = document.getElementById("filter__delete");
// Date du jour par défaut dans l'input 
document.getElementById("formContainer__form--date").valueAsDate = new Date();


// Fonctions
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

// Calcule le nombre de jours restants
function remainingDays(dateString){
    var date = new Date(dateString);
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

// Mettre à jour la liste des tâches dans le stockage local
function updateTasks() {
    // Enregistrer les tâches dans le stockage local
    localStorage.setItem("TASKS", JSON.stringify(allTasks));
    // Réafficher toutes les tâches
    displayAllTasks();
}

// Crée un élément liste au niveau html
function createListItem(task){
    // Création élément liste (div) 
    let listItem = document.createElement("div");
    listItem.setAttribute("class", "card " + task.id);
    let taskLabel = document.createElement("span");
    taskLabel.textContent = task.label;
    let taskDescription = document.createElement("p");
    taskDescription.textContent = task.description;
    let taskDays = document.createElement("p");
    if(remainingDays(task.dueDate) == -1){
        taskDays.textContent = "date d'échéance dépassée"
    }else if(remainingDays(task.dueDate) <= 1 && remainingDays(task.dueDate) > 0){
        taskDays.textContent = remainingDays(task.dueDate) + " jour restant";
    }else{
        taskDays.textContent = remainingDays(task.dueDate) + " jours restants";
    }
    
    // Création des radio box
    let rbDiv = document.createElement("div");
    rbDiv.setAttribute("class", "radioBox " + task.id);
    let todoRb = document.createElement("input");
    todoRb.type = "radio";
    todoRb.name = "radioState " + task.id;
    let todoLab = document.createElement("label");
    todoLab.appendChild(document.createTextNode("à faire"));
    let doingRb = document.createElement("input");
    doingRb.type = "radio";
    doingRb.name = "radioState " + task.id;
    let doingLab = document.createElement("label");
    doingLab.appendChild(document.createTextNode("en cours"));
    let doneRb = document.createElement("input");
    doneRb.type = "radio";
    doneRb.name = "radioState " + task.id;
    let doneLab = document.createElement("label");
    doneLab.appendChild(document.createTextNode("terminée"));

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
	listContainer__list;
	button.appendChild(document.createTextNode("Supprimer"));
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

function deleteDoneTasks() {
    allTasks = allTasks.filter(task => task.state !== "done");
    updateTasks();
}

// Ajoute la tâche à la liste
function addTask(task){
    // Empêcher le comportement par défaut du formulaire (recharger la page)
    task.preventDefault();

	// Empecher un input vide
	let inputLab = document.getElementById("formContainer__form--task").value;
	let inputDesc = document.getElementById(
		"formContainer__form--description"
	).value;
	if (inputLab.trim() === "" || inputDesc.trim() === "") {
		alert("Veuillez saisir une tâche");
		return;
	}

    // Création de l'objet task
    let newTask = new Object();
    newTask.id = getMaxId(); 
    newTask.label = task.target.label.value;
    newTask.description = task.target.description.value;
    newTask.state = "todo";
    console.log(task.target.date.value);
    newTask.dueDate = new Date(task.target.date.value);

	// Ajouter la nouvelle tache au tableau
	allTasks.push(newTask);

	// ajout du li au ul (html)
	let listItem = createListItem(newTask);
	list.appendChild(listItem);

    // Effacer le champ de saisie de texte
    document.getElementById("formContainer__form--task").value = "";
    document.getElementById("formContainer__form--description").value = "";
    document.getElementById("formContainer__form--date").valueAsDate = new Date();
    updateTasks();
}

// Affiche la liste de toutes les tâches
function displayAllTasks() {
	// Vider le contenu du conteneur de liste
	list.innerHTML = "";
	allTasks.forEach(function (task) {
		let listItem = createListItem(task);
		list.appendChild(listItem);
	});
}

/***** Filtres et tri *****/
//Filtre "Todo"
function todoFilter() {
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
function doingFilter() {
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
function doneFilter() {
	list.innerHTML = "";
	allTasks.forEach((task) => {
		let divDone = document.createElement("div");
		if (task.state == "done") {
            divDone = createListItem(task);
		}
		list.appendChild(divDone);
	});
}


// Appels de fonction
displayAllTasks();


// Evenements
form.addEventListener("submit", addTask);
todobtn.addEventListener("click", todoFilter);
doingbtn.addEventListener("click", doingFilter);
donebtn.addEventListener("click", doneFilter);
deletebtn.addEventListener("click", deleteDoneTasks);