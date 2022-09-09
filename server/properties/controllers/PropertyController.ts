import { Request, Response } from "express";
import { CSVExportService } from "../../common/csv-export/CSVExportService";
import PropertyService from "../service/PropertyService";
import fs from "fs";
import FormData from "form-data";
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
        const result: any = await this.service.putById(
            req.body.property_id,
            req.body
        );

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async getProperty(req: Request, res: Response) {
        const result: any = await this.service.getById(req.params.property_id);

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
        const result: any = await this.service.deleteById(req.body.property_id);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async getPropertiesByOwnerId(req: Request, res: Response) {
        const result: any = await this.service.getByOwnerId(
            req.params.owner_id
        );

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async ExportAllPropertyData(req: Request, res: Response) {
        const result: any = await this.service.list(100, 1);

        if (result.data) {
            const form = new FormData();
            res.status(result.status)
                .attachment(`Export-${new Date().toUTCString()}.csv`)
                .send(
                    CSVExportService.ExportToCSV(JSON.stringify(result.data))
                );
        } else {
            res.status(result.status).json(result.error);
        }
    }
}
