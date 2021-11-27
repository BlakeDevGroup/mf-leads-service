import express from "express";
import * as http from "http";
import cors from "cors";
import PropertyRouter from "./server/properties/routes/PropertyRoutes";
import NoteRouter from "./server/notes/routes/NoteRoutes";

const app: express.Application = express();
const server: http.Server = http.createServer(app);

const PORT = process.env.PORT || 3500;
const RUNNING_MESSAGE = `Server running at http://localhost:${PORT}`;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send(RUNNING_MESSAGE);
});

app.use("/property", PropertyRouter);
app.use("/note", NoteRouter);

server.listen(PORT, () => {
  console.log(RUNNING_MESSAGE);
});

export default app;
