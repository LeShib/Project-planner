// Variables
export let allTasks = JSON.parse(localStorage.getItem("TASKS")) || [];

// Fonctions
import { updateTasks } from "./display.js";

// Supprime chaque tâche marquée comme "terminée"
export function deleteDoneTasks() {
    allTasks = allTasks.filter(task => task.state !== "done");
    updateTasks();
}