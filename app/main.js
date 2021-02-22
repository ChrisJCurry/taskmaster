import ValuesController from "./Controllers/ValuesController.js";
import ListsController from "./Controllers/ListsController.js";
import { loadState } from "./Utils/LocalStorage.js";

class App {
  //valuesController = new ValuesController();
  listsController = new ListsController()
}

window["app"] = new App();
loadState()

