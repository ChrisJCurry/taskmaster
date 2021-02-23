import { ProxyState } from '../AppState.js'
import { listsService } from '../Services/ListsService.js'
import { generateId } from '../Utils/GenerateId.js'

function _draw() {
    let listElem = document.getElementById("app")
    let template = ""

    ProxyState.lists.forEach(list => template += list.Template)

    listElem.innerHTML = template
}

export default class ListsController {
    constructor() {
        ProxyState.on("lists", _draw)
        ProxyState.on("tasks", _draw)
        _draw()
    }

    create(event, id) {
        event.preventDefault()
        let form = event.target
        let newTaskList = {
            title: form.title.value,
            bgColor: form.bgColor.value,
            taskId: generateId(),
            finished: false
        }
        //console.log("Title: ", newTaskList.title)
        listsService.create(newTaskList, id)
    }

    delete(id) {
        listsService.delete(id)
    }

    addTask(event, id) {
        event.preventDefault()
        let form = event.target
        let newTask = {
            taskName: form.newTask.value,
            finished: false,
            taskId: generateId(),
            listId: id
        }
        //console.log("id:", id)
        listsService.addTask(newTask, id)
    }

    getTotalTasks(listId) {
        listsService.getTotalTasks(listId)
    }

    removeTask(id, taskId) {
        listsService.removeTask(id, taskId)
    }

    finishTask(id, taskId) {
        listsService.finishTask(id, taskId)
    }
}