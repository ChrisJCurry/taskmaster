import { ProxyState } from "../AppState.js";
import List from "../Models/List.js";
import { generateId } from "../Utils/GenerateId.js";
import { saveState } from "../Utils/LocalStorage.js";

class ListsService {
  constructor() {
    ProxyState.on("lists", saveState)
    ProxyState.on("tasks", saveState)
  }

  create(newTaskList, id) {
    ProxyState.lists = [...ProxyState.lists, new List(newTaskList.title, newTaskList.bgColor, newTaskList.id)]
  }

  delete(id) {

    if (window.confirm("Are you sure you want to delete your list?")) {
      ProxyState.lists = ProxyState.lists.filter(l => l.id != id)
    }
  }

  addTask(newTask, id) {
    ProxyState.tasks = [...ProxyState.tasks, newTask]
  }

  removeTask(id, taskId) {
    if (window.confirm("Are you sure you want to delete your task?")) {
      //console.log(id, taskId)
      ProxyState.tasks = ProxyState.tasks.filter(t => t.taskId != taskId)
    }
  }

  finishTask(id, taskId) {
    let temp = ProxyState.tasks
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].taskId == taskId) {
        temp[i].finished = !temp[i].finished
      }
    }
    ProxyState.tasks = temp

  }
}

export const listsService = new ListsService();

