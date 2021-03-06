import { IProperty } from "../IProperty";
import { IQuery } from "../../common/IQuery";
import Query from "../query/PropertyQuery";


export default class PropertyDAO {

    private query: IQuery;

    constructor(query: IQuery = new Query("properties")) {
        this.query = query;
    }

    async create(property: IProperty) {
        return this.query.create(property);
    }

    async delete(id: string): Promise<any> {
        return this.query.delete(id);
    }

    async read(id: string): Promise<any> {
        return this.query.read(id);
    }

    async readAll(): Promise<IProperty[]> {
        return this.query.readAll();
    }

    async update(id: string, resource: Partial<IProperty>): Promise<any> {
        return this.query.update(id, resource);
    }


    async readPropertiesByOwnerId(owner_id: string) {
        return this.query.readBy("owner_id", owner_id);
    }

    async readBy(property: string, value: string) {}

}
