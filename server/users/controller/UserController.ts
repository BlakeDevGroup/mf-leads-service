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
            res.status(result.status)
                .cookie("token", result.data)
                .json(result.data);
        }
    }

    async createUser(req: Request, res: Response) {
        const result: any = await this.service.add(req.body);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async getUser(req: Request, res: Response) {
        const result: any = await this.service.getById(req.params.id);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async listUsers(req: Request, res: Response) {
        const result: any = await this.service.list(100, 10);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async deleteUser(req: Request, res: Response) {
        const result: any = await this.service.deleteById(req.body.id);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }
}
