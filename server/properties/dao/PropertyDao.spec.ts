import sinonChai from "sinon-chai";
import sinon from "sinon";
import chai, { expect } from "chai";
import PropertyDAO from "./PropertyDao";
import Query from "../../common/query/Query";
import DBMock from "../../common/mocks/DBMock";
import { IProperty } from "../IProperty";

let sandbox: sinon.SinonSandbox;
let spy: sinon.SinonSpy;
let dao: PropertyDAO;
const PROPERTY_DATA: IProperty = {
    city: "",
    state: "",
    street: "",
    zip_code: "",
    owner_name: "",
    owner_email: "",
    owner_number: "",
    owner_entity: "",
    units: 0,
    notes: [],
};
const TABLE_NAME = "properties";
describe("PropertyDAO", () => {
    before(() => {
        sandbox = sinon.createSandbox();
        DBMock[TABLE_NAME] = [];
    });

    beforeEach(() => {
        dao = new PropertyDAO(new Query("properties"));
    });

    describe("create", () => {
        beforeEach(() => {
            spy = sinon.spy(Query.prototype, "create");
        });

        afterEach(() => {
            spy.restore();
        });
        it("should call query.create()", async () => {
            await dao.create(PROPERTY_DATA);

            expect(spy).calledOnce;
            expect(spy).calledWithExactly(PROPERTY_DATA);
        });
    });

    describe("delete", () => {
        beforeEach(() => {
            spy = sinon.spy(Query.prototype, "delete");
        });

        afterEach(() => {
            spy.restore();
        });
        it("should call query.delete()", async () => {
            await dao.delete("PROPERTY_DATA");

            expect(spy).calledOnce;
            expect(spy).calledWithExactly("PROPERTY_DATA");
        });
    });

    describe("read", () => {
        beforeEach(() => {
            spy = sinon.spy(Query.prototype, "read");
        });

        afterEach(() => {
            spy.restore();
        });
        it("should call query.read()", async () => {
            await dao.read("PROPERTY_DATA");

            expect(spy).calledOnce;
            expect(spy).calledWithExactly("PROPERTY_DATA");
        });
    });

    describe("readAll", () => {
        beforeEach(() => {
            spy = sinon.spy(Query.prototype, "readAll");
        });

        afterEach(() => {
            spy.restore();
        });
        it("should call query.readAll()", async () => {
            await dao.readAll();

            expect(spy).calledOnce;
            expect(spy).calledWithExactly();
        });
    });

    describe("update", () => {
        beforeEach(() => {
            spy = sinon.spy(Query.prototype, "update");
        });

        afterEach(() => {
            spy.restore();
        });
        it("should call query.update()", async () => {
            await dao.update("id", PROPERTY_DATA);

            expect(spy).calledOnce;
            expect(spy).calledWithExactly("id", PROPERTY_DATA);
        });
    });
});
