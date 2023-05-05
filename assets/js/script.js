// Variables
// let allTasks = JSON.parse(localStorage.getItem("LIST")) || []; 
let allTasks = [
    {
        id: 1,
        label: "travailler",
        description: "réaliser techtalk",
        dueDate: new Date('1997-6-2'),
        state:"todo",
    },
    {
        id: 2,
        label: "travailler2",
        description: "réaliser techtalk2",
        dueDate: new Date('1978-4-4'),
        state: "todo",
    },
    {
        id: 3,
        label: "travailler3",
        description: "réaliser techtalk3",
        dueDate: new Date('2007-6-22'),
        state: "doing",
    },
    {
        id: 4,
        label: "travailler4",
        description: "réaliser techtalk4",
        dueDate: new Date('2002-6-22'),
        state: "done",
    }
];
const form = document.getElementById("formContainer__form");
const list = document.getElementById("listContainer__list");
const todobtn = document.getElementById("filter__todo");
// Date du jour par défaut dans l'input 
document.getElementById("formContainer__form--date").valueAsDate = new Date();
let id = getMaxId();


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

// Crée un élément liste au niveau html
function createListItem(task){
    // Création élément liste (div) 
    let listItem = document.createElement("div");
    let taskLabel = document.createElement("span");
    taskLabel.textContent = task.label;
    let taskDescription = document.createElement("p");
    taskDescription.textContent = task.description;
    let taskDays = document.createElement("p");
    taskDays.textContent = task.dueDate;

    // Création des radio box
    let rbDiv = document.createElement("div");
    let todoRb = document.createElement("input");
    todoRb.type = "radio";
    todoRb.name = "radioState " + task.id;
    let doingRb = document.createElement("input");
    doingRb.type = "radio";
    doingRb.name = "radioState " + task.id;
    let doneRb = document.createElement("input");
    doneRb.type = "radio";
    doneRb.name = "radioState " + task.id;

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
    todoRb.addEventListener("change", function(){
        task.state = "todo";
    });
    doingRb.addEventListener("change", function(){
        task.state = "doing";
    });
    doneRb.addEventListener("change", function(){
        task.state = "done";
    });

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
    listItem.appendChild(taskDays);
    listItem.appendChild(rbDiv);
    listItem.appendChild(button);

    return listItem;
}

function remainingDays(date){
    let remainingDays;
    let dueDate = date.split('-');
    let todayDate = new Date();
    if(todayDate.getFullYear() === parseInt(dueDate[0])){
        if(todayDate.getMonth() === parseInt(dueDate[1])-1){
            remainingDays = parseInt(dueDate[2]) - todayDate.getDate();
        }else{
            // if(){}
        }
    }else{
        
    }
    return remainingDays;
}

// 31 -> 0, 2, 4, 6, 7, 9, 11
// 30 -> 3, 5, 8, 10
// fev -> 1

function addTask(task){
    // Empêcher le comportement par défaut du formulaire (recharger la page)
    task.preventDefault();

    // Empecher un input vide
    let inputLab = document.getElementById("formContainer__form--task").value;
    let inputDesc = document.getElementById("formContainer__form--description").value;
    if(inputLab.trim() === "" || inputDesc.trim() === ""){
        alert("Veuillez saisir une tâche complète");
        return;
    }

    // Création de l'objet task
    let newTask = new Object();
    newTask.id = id; 
    newTask.label = task.target.label.value;
    newTask.description = task.target.description.value;
    newTask.state = "todo";
    newTask.date = task.target.date.value;
    todayDate = new Date();
    console.log(newTask.date);
    // console.log(newTask.date.getFullYear());
    // console.log(newTask.date.getMonth());
    // console.log(newTask.date.getDay());
    console.log(todayDate.getFullYear());
    console.log(todayDate.getMonth()-1);
    console.log(todayDate.getDay());

    // const str = 'The quick brown fox jumps over the lazy dog.';
    // const words = str.split(' ');
    // console.log(words[3]);
    // // Expected output: "fox"

    let dueDate = newTask.date.split('-');
    console.log('newtask.date',typeof newTask.date)
    console.log(typeof dueDate[0]); // year
    console.log(dueDate[1]-1); // Month
    console.log(dueDate[2]); // Day

    // Ajouter la nouvelle tache au tableau
    allTasks.push(newTask);

    // ajout du li au ul (html)
    let listItem = createListItem(newTask);
    list.appendChild(listItem);

    // Effacer le champ de saisie de texte
    document.getElementById("formContainer__form--task").value = "";
    document.getElementById("formContainer__form--description").value = "";
    document.getElementById("formContainer__form--date").valueAsDate = new Date();
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

// Parcours le tableau
// récupère tous les éléments qui ont "todo" comme state
// affiche tous ces éléments
function todoFilter() {
    list.innerHTML = "";
    allTasks.forEach(task => {
        let divTodo = document.createElement("div");
        if (task.state == "todo") {
            divTodo.innerHTML = 
            `
            <p>${task.label}</p>
            <p>${task.description}</p>
            <p>${task.dueDate}</p>
            <div>
               <input type="radio" name = "radiostate ${task.id}" checked>
               <input type="radio"name = "radiostate ${task.id}">
               <input type="radio" name ="radiostate ${task.id}">
            </div>
            <button> supprimer </button>
            `;
        }
        list.appendChild (divTodo);
    });
}

// Appels de fonction
displayAllTasks();


// Evenements
form.addEventListener("submit", addTask);
todobtn.addEventListener("click", todoFilter);