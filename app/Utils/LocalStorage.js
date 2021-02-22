import { ProxyState } from "../AppState.js";
import List from "../Models/List.js";

export function saveState() {
    localStorage.setItem('task-master', JSON.stringify({
        lists: ProxyState.lists
    }))
}

export function loadState() {

    let data = JSON.parse(localStorage.getItem('task-master'))
    if (data) {
        ProxyState.lists = data.lists.map(oldData => new List(oldData.title, oldData.tasks, oldData.id, oldData.amountOfTasks))
    }
}