import { IService } from "../../common/IService";
import { IProperty } from "../IProperty";
import PropertyDao from "../dao/PropertyDao";
import MessageService, {
    ResponsePayload,
} from "../../common/message/MessageService";
import LogService from "../../common/logging/LoggingService";

export default class PropertyService implements IService {
    private dao: PropertyDao = new PropertyDao();
    async list(limit: number, page: number): Promise<ResponsePayload> {
        try {
            const properties = await this.dao.readAll();

            return MessageService.sendSuccess(200, properties);
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }
    async add(resource: IProperty): Promise<ResponsePayload> {
        try {
            const result = await this.dao.readBy("street", resource.street);

            if (resource.street.toLowerCase() === result[0]?.street.toLowerCase()) {
                return MessageService.sendFailure(
                    400,
                    "A property already exists with that address"
                );
            }

            const property = await this.dao.create(resource);

            return MessageService.sendSuccess(201, property);
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }

    async putById(id: string, resource: IProperty): Promise<ResponsePayload> {
        try {
            const property = await this.dao.update(id, resource);

            return MessageService.sendSuccess(200, property);
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }
    async getById(id: string): Promise<ResponsePayload> {
        try {
            const property = await this.dao.read(id);

            if (!property)
                return MessageService.sendFailure(
                    404,
                    `No property found with id: ${id}`
                );
            return MessageService.sendSuccess(200, property);
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }
    async deleteById(id: string): Promise<any> {
        try {
            await this.dao.delete(id);

            return MessageService.sendSuccess(
                200,
                "Successfully deleted property"
            );
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }

    async getByOwnerId(owner_id: string): Promise<any> {
        try {
            const properties = await this.dao.readPropertiesByOwnerId(owner_id);

            if (!properties)
                return MessageService.sendFailure(
                    404,
                    `No properties found with owner_id: ${owner_id}`
                );
            return MessageService.sendSuccess(200, properties);
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }
}
