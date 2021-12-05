import sinonChai from "sinon-chai";
import sinon from "sinon";
import chai, { expect } from "chai";
import UserDao from "./UserDao";
import Query from "../../common/query/Query";
import DBMock, { clearDBMock } from "../../common/mocks/DBMock";
import { IUser } from "../IUser";

let sandbox: sinon.SinonSandbox;
let spy: sinon.SinonSpy;
let dao: UserDao;

const USER_DATA: IUser = {
    created_date: "10-24-2021",
    modified_on: "",
    password: "asdf",
    user_name: "asdf",
    role: "admin",
};

const TABLE_NAME = "users";

describe("UserDao", () => {
    before(() => {
        sandbox = sinon.createSandbox();
        clearDBMock(TABLE_NAME);
    });
    after(() => {
        clearDBMock(TABLE_NAME);
    });

    beforeEach(() => {
        dao = new UserDao();
    });

    describe("create", () => {
        beforeEach(() => {
            spy = sinon.spy(Query.prototype, "create");
        });

        afterEach(() => {
            spy.restore();
        });
        it("should call query.create()", async () => {
            await dao.create(USER_DATA);

            expect(spy).calledOnce;
            expect(spy).calledWithExactly(USER_DATA);
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
            await dao.delete("USER_DATA");

            expect(spy).calledOnce;
            expect(spy).calledWithExactly("USER_DATA");
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
            await dao.update("id", USER_DATA);

            expect(spy).calledOnce;
            expect(spy).calledWithExactly("id", USER_DATA);
        });
    });
});
