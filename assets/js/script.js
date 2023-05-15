// Variables
import * as variables from "./variables.js";

// Date du jour par défaut dans l'input 
document.getElementById("formContainer__form--date").valueAsDate = new Date();


// Fonctions
import { displayAllTasks } from "./display.js";
import { addTask } from "./add.js";
import * as filter from "./filters.js";
import { deleteDoneTasks } from "./tasks.js";

// Appels de fonctions
displayAllTasks();
// console.log(filter.daysFilter());


// Evenements
variables.form.addEventListener("submit", addTask);
variables.todobtn.addEventListener("click", filter.todoFilter);
variables.doingbtn.addEventListener("click", filter.doingFilter);
variables.donebtn.addEventListener("click", filter.doneFilter);
variables.daysbtn.addEventListener("click", filter.daysFilter);
variables.deletebtn.addEventListener("click", deleteDoneTasks);