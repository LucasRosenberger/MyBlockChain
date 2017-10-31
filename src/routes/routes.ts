import { Blockchain } from './../models/Blockchain';
import { MainController } from './../controllers/MainController';

export class Routes {
    private server;
    private uuid;
    private mainController: MainController;

    constructor(_server, _uuid: string) {
        this.server = _server;
        this.uuid = _uuid;
        this.mainController = new MainController(this.uuid);
        this.setRoutes();
    }
    private setRoutes(): void {
        this.server.route('/mine').get((req, res) => {
            this.mainController.mineBlock(req, res);
        });

        this.server.route('/transactions/new').post(this.mainController.newTransaction);

        this.server.route('/chain').get((req, res) => {
            this.mainController.getChain(req, res);
        });
    }
}