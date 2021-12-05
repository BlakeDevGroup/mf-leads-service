import { IService } from "../../common/IService";
import { INote } from "../INote";
import NoteDao from "../dao/NoteDao";
import MessageService, {
    ResponsePayload,
} from "../../common/message/MessageService";
import LogService from "../../common/logging/LoggingService";

export default class NoteService implements IService {
    private dao: NoteDao = new NoteDao();
    async list(linit: number, page: number): Promise<ResponsePayload> {
        try {
            const notes = await this.dao.readAll();

            return MessageService.sendSuccess(200, notes);
        } catch (e: any) {
            return MessageService.sendFailure(500, e);
        }
    }
    async add(resource: INote): Promise<ResponsePayload> {
        try {
            const note = await this.dao.create(resource);

            return MessageService.sendSuccess(201, note);
        } catch (e: any) {
            return MessageService.sendFailure(500, e);
        }
    }
    async putById(id: string, resource: INote): Promise<ResponsePayload> {
        try {
            const note = await this.dao.update(id, resource);

            return MessageService.sendSuccess(200, note);
        } catch (e: any) {
            return MessageService.sendFailure(500, e);
        }
    }
    async getById(id: string): Promise<ResponsePayload> {
        try {
            const note = await this.dao.read(id);

            if (!note)
                return MessageService.sendFailure(
                    404,
                    `No note found with id: ${id}`
                );
            return MessageService.sendSuccess(200, note);
        } catch (e: any) {
            return MessageService.sendFailure(500, e);
        }
    }
    async deleteById(id: string): Promise<any> {
        try {
            await this.dao.delete(id);

            return MessageService.sendSuccess(200, "Successfully deleted note");
        } catch (e: any) {
            return MessageService.sendFailure(500, e);
        }
    }
}
