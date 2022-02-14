import { IService } from "../../common/IService";
import { IOwner } from "../IOwner";
import OwnerDao from "../dao/OwnerDao";
import MessageService, {
    ResponsePayload,
} from "../../common/message/MessageService";

export default class OwnerService implements IService {
    private dao: OwnerDao = new OwnerDao();

    async list(limit: number, page: number): Promise<any> {
        try {
            const owners = await this.dao.readAll();

            return MessageService.sendSuccess(200, owners);
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }
    async add(resource: IOwner) {
        try {
            const owner = await this.dao.create(resource);

            return MessageService.sendSuccess(201, owner);
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }
    async putById(id: string, resource: Partial<IOwner>) {
        try {
            const owner = await this.dao.update(id, resource);

            return MessageService.sendSuccess(200, owner);
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }
    async getById(id: string) {
        try {
            const owner = await this.dao.read(id);

            if (!owner)
                return MessageService.sendFailure(
                    404,
                    `No owner found with id: ${id}`
                );

            return MessageService.sendSuccess(200, owner);
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }
    async deleteById(id: string) {
        try {
            await this.dao.delete(id);

            return MessageService.sendSuccess(
                200,
                "Successfully deleted owner"
            );
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }
}
