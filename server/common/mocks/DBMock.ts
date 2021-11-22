import { IProperty } from "../../properties/IProperty";

interface IDBMock {
    [key: string]: any[];
}

let DBMock: IDBMock = {
    properties: [],
    notes: [],
};

export default DBMock;

export class DBTableNotFoundError extends Error {
    constructor(table: string) {
        super(`Table: ${table} not found in Database`);
    }
}
