import { generateId } from '../Utils/GenerateId.js'
import { ProxyState } from '../AppState.js'

export default class List {
    constructor(title, tasks = [{}], id = generateId()) {
        this.title = title;
        this.tasks = tasks;
        this.id = id;
    }

    get NavBarTemplate() {
        return;
    }

    get Template() {
        return /* html */`
        <div class="col-12 col-md-6 col-lg-3 pt-2" id="${this.id}">
            <div class="px-3 card bg-gray remove-selection">
                <div class="card-body">
                        <div class="row title-shadow mb-3 d-flex justify-content-between">
                            <div class="col-1 pt-3 p-0">
                                <div class="dropdown d-flex">
                                    <button class="btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="h4">&#043;</span>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <form onsubmit="app.listsController.addTask(event, '${this.id}')">
                                            <div class="input-group d-flex justify-content-around">
                                                <input type="text" name="newTask" class="dropdown-item border border-danger" minlength="3" maxlength="50" placeholder="Add Task...">
                                                <button type="submit" class="btn btn-secondary mt-2">Add</button>
                                                
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="mx-auto pt-2">
                                <div class="card-title h3 text-center">${this.title}</div>
                            </div>
                            <div class="col-1 pt-3 mr-4 p-0">
                                <button class="btn bg-red" onclick="app.listsController.delete('${this.id}')">&#10006;</button>
                            </div>
                        </div>
                        <div class="title-underline"></div>
                        <div>${this.TaskTemplate}</div>
                </div>
            </div>
        </div>
        `
    }

    get TaskTemplate() {
        let template = ""

        let currentList = ProxyState.lists.find(l => l.id == this.id)
        for (let k = 0; k < currentList.tasks.length; k++) {
            template += /*html */`
                    <div class="row py-2">
                        <div class="col-1">
                        <h2><i class="gg-check-r hidden" id="check-${currentList.tasks[k].taskId}"></i></h2>
                        </div>
                        <div class="col-6" onclick="app.listsController.finishedTask('${this.id}','${currentList.tasks[k].taskId}')">
                            <h4 class="h-1" id="task-${currentList.tasks[k].taskId}">${currentList.tasks[k].taskName}</h4>
                        </div>
                        <div class="col-2 offset-2">    
                            <button class="btn btn-danger ml-auto" onclick="app.listsController.removeTask('${this.id}', '${k}')">&#10006;</button>
                        </div>
                    </div>
                    `
        }

        return template
    }
}