import sinonChai from "sinon-chai";
import sinon, { mock, SinonSandbox, SinonSpy, SinonStub } from "sinon";
import chai, { expect } from "chai";
import proxyquire from "proxyquire";
import NoteQuery from "./NoteQuery";
import { INote } from "../INote";

chai.use(sinonChai);

let query: NoteQuery;
let stub: SinonStub;
let sandbox: SinonSandbox;

const note: INote = {
    created_by: "asdf",
    created_timestamp: "asdf",
    last_modified: "",
    modified_by: "",
    note: "some note",
    property_id: "1",
};

describe("NoteQuery", () => {
    before(() => {
        sandbox = sinon.createSandbox();
        stub = sandbox.stub().returns({
            rows: ["returnValue"],
        });

        let NoteQuery = proxyquire("./NoteQuery", {
            "../../common/query/PostGresQuery": { query: stub },
        }).default;

        query = new NoteQuery();
    });
    afterEach(() => {
        stub.resetHistory();
    });
    after(() => {
        sandbox.restore();
    });
    it("should run create query with proper sql and return proper value", async () => {
        const sql = `INSERT INTO "notes" (created_by, created_timestamp, modified_by, last_modified, property_id, note) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;

        const result = await query.create(note);

        expect(stub).calledOnceWith(sql, [
            note.created_by,
            note.created_timestamp,
            note.modified_by,
            note.last_modified,
            note.property_id,
            note.note,
        ]);

        expect(result).to.equal("returnValue");
    });

    it("should run read query with proper sql and return proper value", async () => {
        const sql = `SELECT * FROM "notes" WHERE id = $1`;

        const result = await query.read("1");

        expect(stub).calledOnceWith(sql, ["1"]);

        expect(result).to.equal("returnValue");
    });

    it("should run realAll query with proper sql and return proper value", async () => {
        const sql = `SELECT * FROM "notes"`;

        const result = await query.readAll();

        expect(stub).calledOnceWith(sql, []);

        expect(result).to.eql(["returnValue"]);
    });

    it("should run delete query with proper sql and return proper value", async () => {
        const sql = `DELETE FROM "notes" WHERE id = $1`;

        await query.delete("1");

        expect(stub).calledOnceWith(sql, ["1"]);
    });

    it("should run update query with proper sql and return proper value", async () => {
        const sql = `UPDATE "notes" SET created_by = $1, created_timestamp = $2, modified_by = $3, last_modified = $4, property_id = $5, note = $6 WHERE id = $7 RETURNING *`;

        const result = await query.update("1", note);

        expect(stub).calledOnceWith(sql, [
            note.created_by,
            note.created_timestamp,
            note.modified_by,
            note.last_modified,
            note.property_id,
            note.note,
            "1",
        ]);

        expect(result).to.equal("returnValue");
    });

    it("should run readby qeury with proper sql and return proper value", async () => {
        const sql = `SELECT * FROM "notes" WHERE asdf = 1234`;

        const result = await query.readBy("asdf", "1234");

        expect(stub).calledOnceWith(sql, []);

        expect(result).to.eql(["returnValue"]);
    });
});
