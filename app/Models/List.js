import { generateId } from '../Utils/GenerateId.js'
import { ProxyState } from '../AppState.js'

export default class List {
    constructor(title, bgColor = "gray", id = generateId()) {
        this.title = title;
        this.bgColor = bgColor;
        this.id = id;
    }

    get NavBarTemplate() {
        return;
    }

    get Template() {
        return /* html */`
        <div class="col-12 col-md-6 col-lg-3 pt-2" id="${this.id}">
            <div class="px-3 card remove-selection" style="background-color:${this.bgColor}">
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
                        <div class="curr-tasks">${this.Tasks}</div>
                </div>
            </div>
        </div>
        `
    }

    get Tasks() {
        let proxyTasks = ProxyState.tasks
        let ProxyLists = ProxyState.lists


        //let currList = ProxyState.lists.find(c => c.id == id)

        let amountOfTasks = 0;
        let currTasks = ProxyState.tasks.filter(t => t.listId == this.id)
        //console.log("total: ", currTasks)
        amountOfTasks = currTasks.length
        let amountOfDone = 0

        let currDoneTasks = currTasks.filter(d => d.finished == true)
        amountOfDone = currDoneTasks.length
        let template = ""
        template += /*html*/`
        <div class="text-center pb-3">
            <h2>Tasks completed: ${amountOfDone}/${amountOfTasks}</h2>
        </div>
        `

        let currListTasks = proxyTasks.filter(c => c.listId == this.id)

        for (let i = 0; i < currListTasks.length; i++) {
            template += /*html*/`
            <div class="row pl-2 ${currListTasks[i].finished ? "text-success" : "text-dark"}" onclick="app.listsController.finishTask('${this.id}','${currListTasks[i].taskId}')">
                    <div class="col-3 py-2">
                        <i class="gg-check"></i>
                    </div>    
                    <div class="col-6 py-2">
                        <h4 class="${currListTasks[i].finished ? "finished-text" : ""}">${currListTasks[i].taskName}</h4>
                    </div>
                <div class="col-3 py-2">
                    <button class="btn btn-primary" onclick="app.listsController.removeTask('${this.id}','${currListTasks[i].taskId}')">&#10006;</button>
                </div>
            </div>
            `

        }

        return template;


    }
}