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
    email: "asdf",
    entity: "asdf",
    name: "asdf",
    number: "asdf",
    units: 1,
    purchase_date: new Date(),
    purchase_price: 500,
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
        const sql = `INSERT INTO "properties" (city, state, street, zip_code, units, owner_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;

        const result = await query.create(property);

        expect(stub).calledOnceWith(sql, [
            property.city,
            property.state,
            property.street,
            property.zip_code,
            property.units,
            property.email,
            property.entity,
            property.name,
            property.number,
        ]);

        expect(result).to.equal("returnValue");
    });

    it("should run query with proper sql and return value", async () => {
        const sql = `DELETE FROM "properties" WHERE id = $1`;

        const result = await query.delete("1");

        expect(stub).calledOnceWith(sql, ["1"]);
    });

    it("should call query with proper sql and retur value", async () => {
        const sql = `SELECT * FROM "PropertyView" WHERE id = $1`;

        const result = await query.read("1");

        expect(stub).calledOnceWith(sql, ["1"]);

        expect(result).to.equal("returnValue");
    });

    it("should call query with proper sql and return Value", async () => {
        const sql = `SELECT * FROM "PropertyView"`;

        const result = await query.readAll();

        expect(result).to.eql(["returnValue"]);
    });

    it("should call query with proper sql and return value", async () => {
        const sql = `UPDATE "properties" SET city = $1, state = $2, street = $3, zip_code = $4, units = $5, entity = $6, name = $7, number = $8, email = $9 WHERE id = $10 RETURNING *`;

        const result = await query.update("1", property);

        expect(stub).calledOnceWith(sql, [
            property.city,
            property.state,
            property.street,
            property.zip_code,
            property.units,
            property.entity,
            property.name,
            property.number,
            property.email,
            "1",
        ]);

        expect(result).to.equal("returnValue");
    });

    it("should call query with proper sql and return value", async () => {
        const sql = `SELECT * FROM "PropertyView" WHERE asdf = "1234"`;

        const result = await query.readBy("asdf", "1234");

        expect(stub).calledOnceWith(sql, []);

        expect(result).to.eql(["returnValue"]);
    });
});
