import { Router, Request } from "express";
import UserController from "../controller/UserController";

const userController = new UserController();
const UserRouter = Router();

UserRouter.post("/", userController.authenticate.bind(userController));

UserRouter.post("/create", userController.createUser.bind(userController));

UserRouter.get("/:id", userController.getUser.bind(userController));
UserRouter.put("/:id", userController.updateUser.bind(userController));
UserRouter.delete("/:id", userController.deleteUser.bind(userController));

export default UserRouter;
