import { IUser } from "../IUser";
import { IQuery } from "../../common/IQuery";
import Query from "../../common/query/Query";

export default class UserDao implements IQuery {
    private query: IQuery = new Query("users");

    async create(property: IUser) {
        return this.query.create(property);
    }

    async delete(id: string): Promise<IUser> {
        return this.query.delete(id);
    }

    async read(id: string): Promise<IUser> {
        return this.query.read(id);
    }

    async readAll(): Promise<IUser[]> {
        return this.query.readAll();
    }

    async update(id: string, resource: Partial<IUser>): Promise<IUser> {
        return this.query.update(id, resource);
    }

    async readBy(property: string, value: string) {
        return this.query.readBy(property, value);
    }
}
