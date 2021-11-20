import sinonChai from "sinon-chai";
import sinon from "sinon";
import chai, { expect } from "chai";
import MockQuery from "./MockQuery";
import * as dbMock from "../mocks/DBMock";
import { isUuid } from "uuidv4";

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

            expect(isUuid(result)).to.equal(true);
            expect(dbMock.default[tableName].length).to.equal(1);

            const value = dbMock.default[tableName][0];

            expect(value).to.be.an("object").and.include.keys("random", "id");
            expect(value.random).to.equal("random");
            expect(value.id).to.equal(result);
        });
    });

    describe("delete", () => {
        it("should delete a resource by id", async () => {
            const id = await mockQuery.create(DB_ENTRY);

            await mockQuery.delete(id);

            expect(dbMock.default[tableName].length).to.equal(0);
        });
    });

    describe("read", () => {
        it("when id is in table, then return array with id", async () => {
            const id = await mockQuery.create(DB_ENTRY);

            const result = await mockQuery.read(id);

            expect(dbMock.default[tableName][0]).to.equal(result);
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
            const id = await mockQuery.create(DB_ENTRY);
            const REPLACE_ENTRY = { random: "true" };

            const result = await mockQuery.update(id, REPLACE_ENTRY);

            expect(result).to.equal(dbMock.default[tableName][0]);
            expect(result).to.eql(Object.assign({ id: id }, REPLACE_ENTRY));
        });
    });
});
