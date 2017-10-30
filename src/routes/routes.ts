import { MainController } from './../controllers/MainController';
export class Routes {
    private server;
    private mainController: MainController;

    constructor(_server) {
        this.server = _server;
        this.mainController = MainController.getInstance();
        this.setRoutes();
    }
    private setRoutes(): void {
        this.server.route('/').get(this.mainController.testRoute);
    }
}