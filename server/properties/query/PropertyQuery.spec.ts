import sinonChai from "sinon-chai";
import sinon, { mock, SinonSandbox, SinonSpy, SinonStub } from "sinon";
import chai, { expect } from "chai";
import PropertyQuery from "./PropertyQuery";
import { IProperty } from "../IProperty";
import proxyquire from "proxyquire";

chai.use(sinonChai);

let query: PropertyQuery;
let stub: SinonStub;
let sandbox: SinonSandbox;
const property: IProperty = {
    city: "asdf",
    state: "adsf",
    street: "asdf",
    zip_code: "asdf",
    notes: [],
    owner_email: "asdf",
    owner_entity: "asdf",
    owner_name: "asdf",
    owner_number: "asdf",
    units: 1,
};

describe("Property Query", () => {
    before(() => {
        sandbox = sinon.createSandbox();
        stub = sandbox.stub().returns({
            rows: ["returnValue"],
        });
        let PropertyQuery = proxyquire("./PropertyQuery", {
            "../../common/query/PostGresQuery": { query: stub },
        }).default;
        query = new PropertyQuery();
    });
    afterEach(() => {
        stub.resetHistory();
    });
    after(() => {
        sandbox.restore();
    });
    it('tableName should equal "properties"', () => {
        expect(query["tableName"]).to.equal("properties");
    });

    it("should run create with proper statement and return entity", async () => {
        const sql = `INSERT INTO "properties" (city, state, street, zip_code, units, owner_email, owner_entity, owner_name, owner_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`;

        const result = await query.create(property);

        expect(stub).calledOnceWith(sql, [
            property.city,
            property.state,
            property.street,
            property.zip_code,
            property.units,
            property.owner_email,
            property.owner_entity,
            property.owner_name,
            property.owner_number,
        ]);

        expect(result).to.equal("returnValue");
    });

    it("should run query with proper sql and return value", async () => {
        const sql = `DELETE FROM "properties" WHERE id = $1`;

        const result = await query.delete("1");

        expect(stub).calledOnceWith(sql, ["1"]);
    });

    it("should call query with proper sql and retur value", async () => {
        const sql = `SELECT * FROM "properties" WHERE id = $1`;

        const result = await query.read("1");

        expect(stub).calledOnceWith(sql, ["1"]);

        expect(result).to.equal("returnValue");
    });

    it("should call query with proper sql and return Value", async () => {
        const sql = `SELECT * FROM "properties"`;

        const result = await query.readAll();

        expect(result).to.eql(["returnValue"]);
    });

    it("should call query with proper sql and return value", async () => {
        const sql = `UPDATE "properties" SET city = $1, state = $2, street = $3, zip_code = $4, units = $5, owner_entity = $6, owner_name = $7, owner_number = $8, owner_email = $9 WHERE id = $10 RETURNING *`;

        const result = await query.update("1", property);

        expect(stub).calledOnceWith(sql, [
            property.city,
            property.state,
            property.street,
            property.zip_code,
            property.units,
            property.owner_entity,
            property.owner_name,
            property.owner_number,
            property.owner_email,
            "1",
        ]);

        expect(result).to.equal("returnValue");
    });

    it("should call query with proper sql and return value", async () => {
        const sql = `SELECT * FROM "properties" WHERE asdf = "1234"`;

        const result = await query.readBy("asdf", "1234");

        expect(stub).calledOnceWith(sql, []);

        expect(result).to.eql(["returnValue"]);
    });
});
