import * as express from 'express';

class App {
    public server;

    constructor() {
        this.server = express();
        this.middleWares();
    }

    private middleWares(): void {
        this.server.use(express.json({ extended: true }));
        this.server.use(express.urlencoded({ extended: true }));
    }
}
export default new App().server;