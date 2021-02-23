import { ProxyState } from "../AppState.js";
import List from "../Models/List.js";

export function saveState() {
    localStorage.setItem('task-master', JSON.stringify({
        lists: ProxyState.lists,
        tasks: ProxyState.tasks
    }))
}

export function loadState() {

    let listData = JSON.parse(localStorage.getItem('task-master'))
    if (listData) {
        ProxyState.lists = listData.lists.map(oldData => new List(oldData.title, oldData.bgColor, oldData.id))
        ProxyState.tasks = listData.tasks
    }


}