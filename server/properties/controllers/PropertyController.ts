import { Request, Response } from "express";
import PropertyService from "../service/PropertyService";

export default class PropertyController {
    private service: PropertyService = new PropertyService();

    async createProperty(req: Request, res: Response) {
        const result: any = await this.service.add(req.body);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async updateProperty(req: Request, res: Response) {
        const result: any = await this.service.putById(req.body.id, req.body);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async getProperty(req: Request, res: Response) {
        const result: any = await this.service.getById(req.params.id);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async listProperties(req: Request, res: Response) {
        const result: any = await this.service.list(100, 10);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async deleteProperty(req: Request, res: Response) {
        const result: any = await this.service.deleteById(req.body.id);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }
}
