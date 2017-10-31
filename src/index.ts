import { Routes } from './routes/routes';
import app from './App';
import * as uuidv4 from 'uuid/v4';

const port = 6969;
const uuid = uuidv4().replace('-', '');

let setRoutes = new Routes(app, uuid);

app.listen(port, (err) => {
    return err ? console.log(err) : console.log(`Server listening on port:${port}`);
});