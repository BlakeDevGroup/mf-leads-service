import { Request, Response } from "express";
import { ResponsePayload } from "../../common/message/MessageService";
import UserService from "../service/UserService";

export default class UserController {
    private service: UserService = new UserService();

    async authenticate(req: Request, res: Response) {
        const result: any = await this.service.authenticate(
            req.body.user_name,
            req.body.password
        );

        if (result.error) {
            res.status(result.status).json(result.error);
        } else {
            res.status(result.status).json(result.data);
        }
    }
}
