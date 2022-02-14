import { IQuery } from "../../common/IQuery";
import Query from "../query/OwnerQuery";
import { IOwner } from "../IOwner";

export default class OwnerDao {
    private query: IQuery;

    constructor(query: IQuery = new Query("owners")) {
        this.query = query;
    }

    async create(owner: IOwner) {
        return this.query.create(owner);
    }

    async delete(id: string) {
        return this.query.delete(id);
    }

    async readAll() {
        return this.query.readAll();
    }

    async update(id: string, owner: Partial<IOwner>) {
        return this.query.update(id, owner);
    }

    async readBy(property: string, value: string) {
        return this.query.readBy(property, value);
    }

    async read(id: string) {
        return this.query.read(id);
    }
}
