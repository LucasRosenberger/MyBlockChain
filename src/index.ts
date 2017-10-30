import { Routes } from './routes/routes';
import app from './App';

const port = 6969;

let setRoutes = new Routes(app);

app.listen(port, (err) => {
    return err ? console.log(err) : console.log(`Server listening on port:${port}`);
});