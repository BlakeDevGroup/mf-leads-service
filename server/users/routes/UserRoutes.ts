import { Router, Request } from "express";
import UserController from "../controller/UserController";

const userController = new UserController();
const UserRouter = Router();

UserRouter.post("/", userController.authenticate.bind(userController));

export default UserRouter;
