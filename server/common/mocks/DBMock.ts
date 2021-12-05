import { clear } from "winston";
import { IProperty } from "../../properties/IProperty";

interface IDBMock {
    [key: string]: any[];
}

let DBMock: IDBMock = {
    properties: [],
    notes: [],
    users: [],
};

export default DBMock;

export const clearDBMock = (table: string) => {
    if (!DBMock[table]) throw Error(`${table} does not exist in DBMOck`);

    DBMock[table] = [];
};

export class DBTableNotFoundError extends Error {
    constructor(table: string) {
        super(`Table: ${table} not found in Database`);
    }
}
