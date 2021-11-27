import {Request, Response } from "express";

import { INote } from "../INote";
import NoteService from "../service/NoteService";

export default class NoteController {
    private service: NoteService = new NoteService();

    async createNote(req: Request, res: Response) {
        const result: any = await this.service.add(req.body);
        
        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async updateNote(req: Request, res: Response) {
        const result: any = await this.service.putById(
            req.body.id,
            req.body
        );

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async getNote(req: Request, res: Response) {
        const result: any = await this.service.getById(req.params.id);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async listNote(req: Request, res: Response) {
        const result: any = await this.service.list(100, 10);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }
    }

    async deleteNote(req: Request, res: Response) {
        const result: any = await this.service.deleteById(req.body.id);

        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json(result.error);
        }

    }
    }
    