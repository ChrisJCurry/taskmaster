import {ProxyState} from '../AppState.js'
import {listsService} from '../Services/ListsService.js'

function _draw() {
    console.log("drawing")
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

    create(event) {
        event.preventDefault()
        let form = event.target
        let newTaskList = {
            title: form.title.value
        }
        listsService.create(newTaskList)
    }

    delete(id) {
        listsService.delete(id)
    }

    addTask(event, id) {
        event.preventDefault()
        let form = event.target
        let newTask = form.newTask.value;
        listsService.addTask(newTask, id)
    }

    removeTask(id) {

    }
}