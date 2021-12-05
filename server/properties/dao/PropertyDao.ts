import { IProperty } from "../IProperty";
import { IQuery } from "../../common/IQuery";
import Query from "../../common/query/Query";

export default class PropertyDAO implements IQuery {
    private query: IQuery = new Query("properties");

    async create(property: IProperty) {
        return this.query.create(property);
    }

    async delete(id: string): Promise<any> {
        return this.query.delete(id);
    }

    async read(id: string): Promise<any> {
        return this.query.read(id);
    }

    async readAll(): Promise<any> {
        return this.query.readAll();
    }

    async update(id: string, resource: Partial<IProperty>): Promise<any> {
        return this.query.update(id, resource);
    }
    async readBy(property: string, value: string) {}
}
