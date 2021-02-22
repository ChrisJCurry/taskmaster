import { ProxyState } from "../AppState.js";
import List from "../Models/List.js";
import { generateId } from "../Utils/GenerateId.js";
import { saveState } from "../Utils/LocalStorage.js";

class ListsService {
  constructor() {
    ProxyState.on("lists", saveState)
  }

  setBackground(value) {
    document.querySelectorAll("card").forEach(function (c) {
      c.style.color = value;
    })
  }

  create(newTaskList) {
    ProxyState.lists = [...ProxyState.lists, new List(newTaskList.taskName)]
    let temp = ProxyState.lists
    for (let i = 0; i < ProxyState.lists.length; i++) {
      let currList = temp[i]
      // if (Object.keys(temp[i].tasks).length === 0) {
      //   console.log("got", temp[i].tasks)
      // }
      temp[i].tasks.shift()
    }
    ProxyState.lists = temp
  }

  delete(id) {

    if (window.confirm("Are you sure you want to delete your list?")) {
      ProxyState.lists = ProxyState.lists.filter(l => l.id != id)
    }


  }

  addTask(newTask, id) {
    let currList = ProxyState.lists.find(task => task.id == id)
    let currTasks = currList.tasks
    //console.log(currList, currTasks)
    let addedTask = { taskName: newTask.taskName, finished: newTask.finished, taskId: generateId() }
    currTasks.push(addedTask)
    let temp = ProxyState.lists
    ProxyState.lists = temp
    this.resetFinished(currList)
    this.getTaskCount(currList)
  }

  getTaskCount(list) {
    let tasks = 0;
    let taskAmountElem = document.getElementById()
    for (let i = 0; i < list.tasks.length; i++) {
      tasks++
    }
    //taskAmountElem.innerHTML =
    return tasks;
  }

  removeTask(id, taskId) {
    if (window.confirm("Are you sure you want to delete your task?")) {
      //console.log(id, taskId)
      let temp = ProxyState.lists

      let currList = ProxyState.lists.find(list => list.id == id)

      if (!currList) {
        return;
      }

      for (let i = 0; i < currList.tasks.length; i++) {
        if (i == taskId) {
          currList.tasks.splice(i, 1)
          ProxyState.lists = temp
        }
        this.resetFinished(currList)
        this.getTaskCount(currList)
      }
    }
  }

  resetFinished(list) {
    let temp = ProxyState.lists;
    let currTasks = list.tasks;

    for (let i = 0; i < temp.length; i++) {
      let iTasks = temp[i].tasks

      for (let k = 0; k < iTasks.length; k++) {

        let elemId = "task-" + iTasks[k].taskId
        let checkId = "check-" + iTasks[k].taskId
        let currElem = document.getElementById(elemId)
        let checkElem = document.getElementById(checkId)

        if (iTasks[k].finished) {
          currElem.style.color = "green";
          checkElem.style.color = "green";
          checkElem.classList.remove("hidden")
        } else if (iTasks[k].finished == false) {
          currElem.style.color = "white";
          checkElem.style.color = "white";
          checkElem.classList.add("hidden")
        }
      }
    }


  }

  finishedTask(id, taskId) {
    let temp = ProxyState.lists;

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id == id) {
        for (let k = 0; k < temp[i].tasks.length; k++) {
          let currentTask = temp[i].tasks[k]
          if (currentTask.taskId == taskId) {
            if (currentTask.finished) {
              currentTask.finished = false;
            } else {
              currentTask.finished = true;
            }
            let elemId = "task-" + currentTask.taskId
            let checkId = "check-" + currentTask.taskId
            let currElem = document.getElementById(elemId)
            let checkElem = document.getElementById(checkId)

            if (currentTask.finished) {
              currElem.style.color = "green";
              checkElem.style.color = "green";
              checkElem.classList.remove("hidden")
            } else {
              currElem.style.color = "white";
              checkElem.style.color = "white";
              checkElem.classList.add("hidden")
            }
          }
        }
      }
    }
  }
}

export const listsService = new ListsService();

