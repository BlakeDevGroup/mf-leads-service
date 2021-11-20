import { IQuery } from "../IQuery";
import DBMock, { DBTableNotFoundError } from "../mocks/DBMock";
import { uuid } from "uuidv4";

export default class MockQuery implements IQuery {
    private table: any[];
    private tableName: string;
    constructor(tableName: string) {
        this.tableName = tableName;
        if (!DBMock[tableName]) {
            throw new DBTableNotFoundError(tableName);
        }

        this.table = DBMock[tableName];
    }

    async create(resource: any): Promise<any> {
        const id = uuid();
        this.table.push(Object.assign({}, resource, { id: id }));

        this.writeToDB();
        return id;
    }

    async delete(id: string): Promise<any> {
        this.table = this.table.filter((entry) => entry.id !== id);

        this.writeToDB();
    }

    async read(id: string): Promise<any> {
        return this.table.filter((entry) => entry.id == id)[0];
    }

    async readAll(): Promise<any> {
        return this.table;
    }

    async update(id: string, resource: Partial<any>): Promise<any> {
        let updatedEntry;
        this.table = this.table.map((entry) => {
            if (entry.id == id) {
                updatedEntry = Object.assign(entry, resource);
                return updatedEntry;
            } else return entry;
        });

        this.writeToDB();

        return updatedEntry;
    }

    private writeToDB() {
        DBMock[this.tableName] = this.table;
    }
}
