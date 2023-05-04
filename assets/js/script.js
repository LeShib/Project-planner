// Variables
// let allTasks = JSON.parse(localStorage.getItem("LIST")) || []; 
let allTasks = [];
const form = document.getElementById("formContainer__form");
const list = document.getElementById("listContainer__list");
let id = getMaxId();

function test(task){
    // let label = document.getElementById("formContainer__form--task");
    task.preventDefault();
    console.log(task.target.label.value);
    console.log(task.target.description.value);
    console.log(task.target.date.value);
    // console.log(label.value);
}


// Fonctions
function getMaxId(){
    let newId = 0;
    allTasks.forEach(task => {
        if(task.id > newId){
            newId = task.id;
        }
    });
    return (newId+1);
}

function createListItem(task){
    // Création élément liste (div) 
    let listItem = document.createElement("div");
    let taskLabel = document.createElement("span");
    taskLabel.textContent = task.label;

    let taskDescription = document.createElement("p");
    taskDescription.textContent = task.description;

    let taskDays = document.createElement("p");
    taskDays.textContent = task.date;

    // Création des radio box
    let rbDiv = document.createElement("div");
    let todoRb = document.createElement("input");
    todoRb.type = "radio";
    todoRb.name = "radioState";
    todoRb.checked = true;
    let doingRb = document.createElement("input");
    doingRb.type = "radio";
    doingRb.name = "radioState";
    let doneRb = document.createElement("input");
    doneRb.type = "radio";
    doneRb.name = "radioState";

    // Ajout d'évènements aux radio box
    todoRb.addEventListener("change", function(){
        if(!todoRb){
            task.state = "todo";
            todoRb.checked = true;
        }
    });
    // todoRb.addEventListener("click", function() {
    //     listItem.classList.toggle("todo");
    //     task.state = !task.state;
    // });

    doingRb.addEventListener("change", function(){
        if(!doingRb){
            task.state = "doing";
            doingRb.checked = true;
        }
    });
    // doingRb.addEventListener("click", function() {
    //     listItem.classList.toggle("doing");
    //     task.state = !task.state;
    // });

    doneRb.addEventListener("change", function(){
        if(!doneRb){
            task.state = "done";
            doneRb.checked = true;
        }
    });
    // doneRb.addEventListener("click", function() {
    //     listItem.classList.toggle("done");
    //     task.state = !task.state;
    // });

    // Création du bouton delete
    let button = document.createElement("button");
    button.setAttribute("class", "but " + task.id);
    button.appendChild(document.createTextNode("Supprimer"));
    button.addEventListener("click", function() {
        listItem.remove();
        // Supprimer la tâche du tableau (allTasks)
        let deletedTaskIndex = allTasks.findIndex(t => t.id === task.id);
        if (deletedTaskIndex !== -1) {
            allTasks.splice(deletedTaskIndex, 1);
        }
    });

    // Ajouter les radio box au span
    rbDiv.appendChild(todoRb);
    rbDiv.appendChild(doingRb);
    rbDiv.appendChild(doneRb);

    // Ajouter les éléments à la div 
    listItem.appendChild(taskLabel);
    listItem.appendChild(taskDescription);
    listItem.appendChild(rbDiv);
    listItem.appendChild(button);

    return listItem;
}

function addTask(task){
    // Empêcher le comportement par défaut du formulaire (recharger la page)
    task.preventDefault();

    // Empecher un input vide
    let inputLab = document.getElementById("formContainer__form--task").value;
    let inputDesc = document.getElementById("formContainer__form--description").value;
    if(inputLab.trim() === "" || inputDesc.trim() === ""){
        alert("Veuillez saisir une tâche");
        return;
    }

    // Création de l'objet task
    let newTask = new Object();
    newTask.label = task.target.label.value;
    newTask.description = task.target.description.value;
    newTask.date = task.target.date.value;
    newTask.state = "todo";
    newTask.id = id; 

    // Ajouter la nouvelle tache au tableau
    allTasks.push(newTask);

    // ajout du li au ul (html)
    let listItem = createListItem(newTask);
    list.appendChild(listItem);

    // Effacer le champ de saisie de texte
    document.getElementById("formContainer__form--task").value = "";
    document.getElementById("formContainer__form--description").value = "";
    displayAllTasks();
}

function displayAllTasks(){
    // Vider le contenu du conteneur de liste
    list.innerHTML = "";
    allTasks.forEach(function(task) {
        let listItem = createListItem(task);
        list.appendChild(listItem);
    });
}

// Appels de fonction
displayAllTasks();

// Evenements
form.addEventListener("submit", addTask);