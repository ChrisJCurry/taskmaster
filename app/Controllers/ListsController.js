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

        _draw()
    }

    setBackground(event) {
        event.preventDefault()
        let value = event.target.value
        listsService.setBackground(value)
    }

    create(event) {
        event.preventDefault()
        let form = event.target
        let newTaskList = {
            taskName: form.title.value,
        }
        listsService.create(newTaskList)
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
            taskId: generateId()
        }
        listsService.addTask(newTask, id)
    }

    removeTask(id, taskId) {
        listsService.removeTask(id, taskId)
    }

    finishedTask(id, taskId) {
        listsService.finishedTask(id, taskId)
    }
}