import sinonChai from "sinon-chai";
import sinon, { mock, SinonSandbox, SinonSpy, SinonStub } from "sinon";
import chai, { expect } from "chai";
import proxyquire, { callThru } from "proxyquire";
import OwnerQuery from "./OwnerQuery";
import { IOwner } from "../IOwner";

chai.use(sinonChai);

let query: OwnerQuery;
let stub: SinonStub;
let sandbox: SinonSandbox;

const owner: IOwner = {
    email: "",
    entity: "",
    name: "",
    phone_number: 1234,
};

describe("OwnerQuery", () => {
    before(() => {
        sandbox = sinon.createSandbox();
        stub = sandbox.stub().returns({
            rows: ["returnValue"],
        });

        let NoteQuery = proxyquire("./OwnerQuery", {
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
        const sql = `INSERT INTO "owners" (name, email, entity, phone_number) VALUES ($1, $2, $3, $4) RETURNING id`;

        const result = await query.create(owner);

        expect(stub).calledOnceWith(sql, [
            owner.name,
            owner.email,
            owner.entity,
            owner.phone_number,
        ]);

        expect(result).to.equal("returnValue");
    });

    it("should run read query with proper sql and return proper value", async () => {
        const sql = `SELECT * FROM "owners" WHERE id = $1`;

        const result = await query.read("1");

        expect(stub).calledOnceWith(sql, ["1"]);

        expect(result).to.equal("returnValue");
    });

    it("should run delete query with proper sql and return proper value", async () => {
        const sql = `DELETE FROM "owners" WHERE id = $1`;

        await query.delete("1");

        expect(stub).calledOnceWith(sql, ["1"]);
    });

    it("should run readall query with proper sql and return proper value", async () => {
        const sql = `SELECT * FROM "owners"`;

        const result = await query.readAll();

        expect(stub).calledOnceWith(sql, []);

        expect(result).to.eql(["returnValue"]);
    });

    it("should run readby query with proper sql and return proper value", async () => {
        const sql = `SELECT * FROM "owners" WHERE asdf = 1234`;

        const result = await query.readBy("asdf", "1234");

        expect(stub).calledOnceWith(sql, []);

        expect(result).to.eql(["returnValue"]);
    });

    it("should run update query with proper sql and return proper value", async () => {
        const sql = `UPDATE "owners" SET name = $1, email = $2, entity = $3, phone_number = $4 WHERE id = $5 RETURNING *`;

        const result = await query.update("1", owner);

        expect(stub).calledOnceWith(sql, [
            owner.name,
            owner.email,
            owner.entity,
            owner.phone_number,
            "1",
        ]);

        expect(result).to.equal("returnValue");
    });
});
