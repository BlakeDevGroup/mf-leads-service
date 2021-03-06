import sinonChai from "sinon-chai";
import sinon, { mock } from "sinon";
import chai, { expect } from "chai";
import MockQuery from "./MockQuery";
import * as dbMock from "../mocks/DBMock";
import { isUuid } from "uuidv4";
import { clearDBMock } from "../mocks/DBMock";

chai.use(sinonChai);

let mockQuery: MockQuery;
let tableName = "Random";
const DB_ENTRY = { random: "random" };
describe("MockQuery", () => {
    beforeEach(() => {
        dbMock.default[tableName] = [];
        mockQuery = new MockQuery(tableName);
    });
    it("when table does not exist in database then throw DBTableNotFoundError", () => {
        let spy = sinon.spy(dbMock, "DBTableNotFoundError");
        let table = "ASDFASDXF";
        try {
            mockQuery = new MockQuery(table);
        } catch (e: any) {
            console.log(e.message);
            expect(e instanceof dbMock.DBTableNotFoundError).to.equal(true);
        }

        expect(spy).to.have.been.calledOnceWith(table);
    });
    describe("create", () => {
        it("should create a resource in db", async () => {
            const result = await mockQuery.create(DB_ENTRY);

            const expected = Object.assign(DB_ENTRY, { id: result.id });
            expect(result).to.eql(expected);
            expect(dbMock.default[tableName].length).to.equal(1);

            const value = dbMock.default[tableName][0];

            expect(value).to.be.an("object").and.include.keys("random", "id");
            expect(value.random).to.equal("random");
            expect(value.id).to.eql(result.id);
        });
    });

    describe("delete", () => {
        it("should delete a resource by id", async () => {
            const result = await mockQuery.create(DB_ENTRY);

            await mockQuery.delete(result.id);

            expect(dbMock.default[tableName].length).to.equal(0);
        });
    });

    describe("read", () => {
        it("when id is in table, then return array with id", async () => {
            const expected = await mockQuery.create(DB_ENTRY);

            const result = await mockQuery.read(expected.id);

            expect(result).to.eql(expected);
        });

        it("when id is not in table, then remove array with id", async () => {
            const result = await mockQuery.read("ASDF");

            expect(result).to.equal(undefined);
        });
    });

    describe("readAll", () => {
        it("get all entries from table", async () => {
            for (let i = 0; i < 5; i++) {
                await mockQuery.create(DB_ENTRY);
            }

            const result = await mockQuery.readAll();

            expect(result).to.be.an("array");
            expect(result.length).to.equal(5);
        });
    });

    describe("udpate", () => {
        it("when id is not in table, return undefined", async () => {
            const result = await mockQuery.update("ASDF", { random: "TRUE" });

            expect(result).to.equal(undefined);
        });

        it("when id is in table, return updated result", async () => {
            let expected = await mockQuery.create(DB_ENTRY);
            let REPLACE_ENTRY = { random: "true" };

            const result = await mockQuery.update(expected.id, REPLACE_ENTRY);

            expect(result).to.eql(Object.assign(expected, REPLACE_ENTRY));
        });
    });

    describe("readBy", () => {
        it("should return entity when value exists for given property", async () => {
            const expected = await mockQuery.create(DB_ENTRY);

            const result = await mockQuery.readBy("random", "random");

            expect(result[0]).to.equal(dbMock.default[tableName][0]);
            expect(result[0]).to.eql(expected);
        });

        it("should return undefined when value does not exist for given property", async () => {
            const id = await mockQuery.create(DB_ENTRY);

            const result = await mockQuery.readBy("random", "asdf");

            expect(result[0]).to.not.equal(dbMock.default[tableName][0]);

            expect(result[0]).to.equal(undefined);
        });

        it("should return undefined when property does not exist for given table", async () => {
            const id = await mockQuery.create(DB_ENTRY);

            const result = await mockQuery.readBy("asdf", "random");

            expect(result[0]).to.not.equal(dbMock.default[tableName][0]);

            expect(result[0]).to.equal(undefined);
        });
    });
});
