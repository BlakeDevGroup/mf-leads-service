import express from "express";
import * as http from "http";
import cors from "cors";
import PropertyRouter from "./server/properties/routes/PropertyRoutes";
import NoteRouter from "./server/notes/routes/NoteRoutes";
import { body } from "express-validator";
import DBMock from "./server/common/mocks/DBMock";
import bcrypt from "bcrypt";
import UserRouter from "./server/users/routes/UserRoutes";
import { loadPropertyData } from "./server/data/LoadMockPropertyData";

const app: express.Application = express();
const server: http.Server = http.createServer(app);

const PORT = process.env.PORT || 3500;
const RUNNING_MESSAGE = `Server running at http://localhost:${PORT}`;

bcrypt.hash("user", 10, (err, hash) => {
    DBMock["users"].push({
        created_date: new Date().toDateString(),
        modified_on: "",
        password: hash,
        user_name: "user",
    });
    console.log("finished adding user");
});

bcrypt.hash("Vandenk1!", 10, (err, hash) => {
    DBMock["users"].push({
        created_date: new Date().toDateString(),
        modified_on: "",
        password: hash,
        user_name: "admin",
    });
    console.log("finished adding user");
});

loadPropertyData();

const SECRET = process.env.SECRET;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send(RUNNING_MESSAGE);
});

app.use("/property", PropertyRouter);
app.use("/note", NoteRouter);
app.use("/login", UserRouter);

server.listen(PORT, () => {
    console.log(RUNNING_MESSAGE);
});

export default app;
