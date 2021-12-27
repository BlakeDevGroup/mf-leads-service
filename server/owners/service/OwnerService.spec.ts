import sinonChai from "sinon-chai";
import sinon from "sinon";
import chai, { expect } from "chai";
import MessageService from "../../common/message/MessageService";
import { ResponsePayload } from "../../common/message/MessageService";
import OwnerService from "./OwnerService";
import OwnerDao from "../dao/OwnerDao";
import { IOwner } from "../IOwner";

chai.use(sinonChai);

let stub: sinon.SinonStub;
let spySuccess: sinon.SinonSpy;
let spyFailure: sinon.SinonSpy;
let sandbox: sinon.SinonSandbox;
let service: OwnerService;

const owner: IOwner = {
    email: "",
    entity: "",
    name: "",
    phone_number: 0,
};

const ERROR = new Error("ERROR");

describe("OwnerService", () => {
    before(() => {
        sandbox = sinon.createSandbox();
        service = new OwnerService();
        spySuccess = sandbox.spy(MessageService, "sendSuccess");
        spyFailure = sandbox.spy(MessageService, "sendFailure");
    });

    afterEach(() => {
        sandbox.reset();
        stub.restore();
    });
    after(() => {
        spySuccess.restore();
        spyFailure.restore();
        sandbox.restore();
    });

    describe("readAll", () => {
        beforeEach(() => {
            stub = sandbox.stub(OwnerDao.prototype, "readAll");
        });

        afterEach(() => {
            stub.resetHistory();
        });

        it("should run readAll and return status 200", async () => {
            stub.resolves(owner);
            const result = await service.list(100, 10);

            expect(stub).calledOnceWith();

            expect(spySuccess).calledOnceWith(200, owner);

            expect(result).to.equal(spySuccess.returnValues[0]);
        });

        it("should send failure with status 500 when error is caught for readAll", async () => {
            stub.throws(ERROR);

            const result = await service.list(100, 10);

            expect(stub).calledOnceWith();

            expect(spyFailure).calledOnceWith(500, ERROR.message);

            expect(result).to.equal(spyFailure.returnValues[0]);
        });
    });

    describe("add", () => {
        beforeEach(() => {
            stub = sandbox.stub(OwnerDao.prototype, "create");
        });

        afterEach(() => {
            stub.resetHistory();
        });

        it("should send success with status 201", async () => {
            stub.resolves(owner);

            const result = await service.add(owner);

            expect(stub).calledOnceWith(owner);

            expect(spySuccess).calledOnceWith(201, owner);

            expect(result).to.equal(spySuccess.returnValues[0]);
        });

        it("should send failure with status 500", async () => {
            stub.throws(ERROR);

            const result = await service.add(owner);

            expect(spyFailure).calledOnceWith(500, ERROR.message);

            expect(result).to.equal(spyFailure.returnValues[0]);
        });
    });

    describe("putById", () => {
        beforeEach(() => {
            stub = sandbox.stub(OwnerDao.prototype, "update");
        });

        afterEach(() => {
            stub.resetHistory();
        });
        it("should send success with status 200", async () => {
            stub.resolves(owner);

            const result = await service.putById("1", owner);

            expect(stub).calledOnceWith("1", owner);

            expect(spySuccess).calledOnceWith(200, owner);

            expect(result).to.equal(spySuccess.returnValues[0]);
        });

        it("should send failure with status 500", async () => {
            stub.throws(ERROR);

            const result = await service.putById("1", owner);

            expect(spyFailure).calledOnceWith(500, ERROR.message);

            expect(result).to.equal(spyFailure.returnValues[0]);
        });
    });

    describe("getById", () => {
        beforeEach(() => {
            stub = sandbox.stub(OwnerDao.prototype, "read");
        });

        afterEach(() => {
            stub.resetHistory();
        });
        it("should send success with status 200", async () => {
            stub.resolves(owner);

            const result = await service.getById("1");

            expect(stub).calledOnceWith("1");

            expect(spySuccess).calledOnceWith(200, owner);

            expect(result).to.equal(spySuccess.returnValues[0]);
        });

        it("if owner is undefined send failure with status 404", async () => {
            stub.resolves(undefined);

            const result = await service.getById("1");

            expect(spyFailure).calledOnceWith(404, "No owner found with id: 1");

            expect(result).to.equal(spyFailure.returnValues[0]);
        });

        it("should send failure with status 500", async () => {
            stub.throws(ERROR);

            const result = await service.getById("1");

            expect(spyFailure).calledOnceWith(500, ERROR.message);

            expect(result).to.equal(spyFailure.returnValues[0]);
        });
    });

    describe("deleteById", () => {
        beforeEach(() => {
            stub = sandbox.stub(OwnerDao.prototype, "delete");
        });

        afterEach(() => {
            stub.resetHistory();
        });

        it("should send success with status 200", async () => {
            await service.deleteById("1");

            expect(spySuccess).calledOnceWith(
                200,
                "Successfully deleted owner"
            );
        });

        it("should send failure with status 500", async () => {
            stub.throws(ERROR);
            await service.deleteById("1");

            expect(spyFailure).calledOnceWith(500, ERROR.message);
        });
    });
});
