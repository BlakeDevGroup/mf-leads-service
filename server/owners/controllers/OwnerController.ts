import { Request, Response } from "express";
import OwnerService from "../service/OwnerService";

export default class OwnerController {
    private service: OwnerService = new OwnerService();

    async createOwner(req: Request, res: Response) {
        const result: any = await this.service.add(req.body);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async updateOwner(req: Request, res: Response) {
        const result: any = await this.service.putById(
            req.body.owner_id,
            req.body
        );

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async getOwner(req: Request, res: Response) {
        const result: any = await this.service.getById(req.params.owner_id);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async listOwners(req: Request, res: Response) {
        const result: any = await this.service.list(100, 10);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async deleteOwner(req: Request, res: Response) {
        const result: any = await this.service.deleteById(req.body.owner_id);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }
}
