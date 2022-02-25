import { IUser } from "../IUser";
import { IQuery } from "../../common/IQuery";
// import Query from "../../common/query/Query";
import Query from "../query/UserQuery"

export default class UserDao implements IQuery {
    private query: IQuery = new Query("users");

    async create(user: IUser) {
        return this.query.create(user);
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

    async readBy(property: string, value: string): Promise<IUser[]> {
        return this.query.readBy(property, value);
    }
}
