import { ProxyState } from "../AppState.js";
import List from "../Models/List.js";

class ListsService {
  constructor() {

  }

  create(newTaskList) {
      ProxyState.lists = [...ProxyState.lists, new List(newTaskList.title)]
      $('#createListModal').addClass("remove")
  }

  delete(id) { 
      console.log(id)
      ProxyState.lists = ProxyState.lists.filter(l => l.id != id)
  }

  addTask(newTask, id) {
       let currList = ProxyState.lists.find(task => task.id == id)
       currList.tasks = [...currList.tasks, newTask]
       let temp = ProxyState.lists
       ProxyState.lists = temp
  }
}

export const listsService = new ListsService();

