import express from 'express';
import { checkConnection } from './DB/connection.db.js';
import authcontroller from './modules/auth/auth.controller.js';
import usercontroller from './modules/users/user.controller.js';
import blogcontroller from './modules/bloogs/bloog.controller.js';

const bootstrap = () => {
    const app = express();
    const port = 3000;

    app.use(express.json()); //it is a middleware to parse json data 
    checkConnection();
    app.get("/", (req, res) => {
        res.send("Hello world");
    })
    app.use("/auth", authcontroller);
    app.use("/users", usercontroller);
    app.use("/bloog", blogcontroller);
    return app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

export default bootstrap