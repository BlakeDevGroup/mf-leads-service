import sinonChai from "sinon-chai";
import sinon from "sinon";
import chai, { expect } from "chai";
import PropertyDao from "../dao/PropertyDao";
import PropertyService from "./PropertyService";
import { IProperty } from "../IProperty";
import MessageService from "../../common/message/MessageService";
import LogService from "../../common/logging/LoggingService";

chai.use(sinonChai);
let stub: sinon.SinonStub;
let spySuccess: sinon.SinonSpy;
let spyFailure: sinon.SinonSpy;
let spyLog: sinon.SinonSpy;
let sandbox: sinon.SinonSandbox;
let service: PropertyService;

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
    purchase_date: "",
    purchase_price: 200,
};
const ID = "1";
const ERROR = new Error("ERROR");

describe("PropertyService", () => {
    before(() => {
        sandbox = sinon.createSandbox();
        service = new PropertyService();
        spySuccess = sandbox.spy(MessageService, "sendSuccess");
        spyFailure = sandbox.spy(MessageService, "sendFailure");
        spyLog = sandbox.spy(LogService, "log");
    });

    afterEach(() => {
        sandbox.reset();
    });
    after(() => {
        spySuccess.restore();
        spyFailure.restore();
        spyLog.restore();
        sandbox.restore();
    });

    describe("add", () => {
        before(() => {
            stub = sandbox.stub(PropertyDao.prototype, "create");
        });

        afterEach(() => {
            stub.resetHistory();
        });
        it("when an error is thrown then catch error and send failure", async () => {
            stub.throws(ERROR);

            const result = await service.add(PROPERTY_DATA);

            expect(stub).calledOnceWith(PROPERTY_DATA);
            expect(spyFailure).to.have.been.calledOnceWith(500, ERROR.message);

            expect(result).to.equal(spyFailure.returnValues[0]);
        });

        it("should send success with status 201 and dao.create() return value", async () => {
            stub.resolves(PROPERTY_DATA);
            const result = await service.add(PROPERTY_DATA);

            expect(spySuccess).calledOnceWith(201, PROPERTY_DATA);

            expect(result).to.equal(spySuccess.returnValues[0]);
        });
    });

    describe("list", () => {
        before(() => {
            stub = sandbox.stub(PropertyDao.prototype, "readAll");
        });

        afterEach(() => {
            stub.resetHistory();
        });
        it("when an error is thrown then catch error and send failure", async () => {
            stub.throws(ERROR);
            const result = await service.list(100, 10);

            expect(stub).calledOnceWith();
            expect(spyFailure).calledOnceWith(500, ERROR.message);
            expect(result).to.equal(spyFailure.returnValues[0]);
        });

        it("should send success with status 200 and doa.readall() return value", async () => {
            stub.resolves(PROPERTY_DATA);

            const result = await service.list(100, 10);

            expect(spySuccess).calledOnceWith(200, PROPERTY_DATA);
            expect(result).to.equal(spySuccess.returnValues[0]);
        });
    });

    describe("putById", () => {
        before(() => {
            stub = sandbox.stub(PropertyDao.prototype, "update");
        });

        afterEach(() => {
            stub.resetHistory();
        });
        it("when an error is thrown then catch error and send failure", async () => {
            stub.throws(ERROR);

            const result = await service.putById(ID, PROPERTY_DATA);

            expect(stub).calledOnceWith(ID, PROPERTY_DATA);
            expect(spyFailure).calledOnceWith(500, ERROR.message);
            expect(result).to.equal(spyFailure.returnValues[0]);
        });

        it("should send success with status 200 and doa.update() return value", async () => {
            stub.resolves(PROPERTY_DATA);

            const result = await service.putById(ID, PROPERTY_DATA);

            expect(spySuccess).calledOnceWith(200, PROPERTY_DATA);

            expect(result).to.equal(spySuccess.returnValues[0]);
        });
    });

    describe("getById", () => {
        before(() => {
            stub = sandbox.stub(PropertyDao.prototype, "read");
        });

        afterEach(() => {
            stub.resetHistory();
        });
        it("when an error is thrown then catch error and send failure", async () => {
            stub.throws(ERROR);

            const result = await service.getById(ID);

            expect(stub).calledOnceWith(ID);
            expect(spyFailure).calledOnceWith(500, ERROR.message);
            expect(result).to.equal(spyFailure.returnValues[0]);
        });

        it("should send success with status 200 and doa.read() return value", async () => {
            stub.resolves(PROPERTY_DATA);

            const result = await service.getById(ID);

            expect(spySuccess).calledWith(200, PROPERTY_DATA);

            expect(result).to.equal(spySuccess.returnValues[0]);
        });

        it("when property is empty then send failure with status 404", async () => {
            stub.resolves(undefined);

            const result = await service.getById(ID);

            expect(spyFailure).calledOnceWith(
                404,
                `No property found with id: ${ID}`
            );

            expect(result).to.equal(spyFailure.returnValues[0]);
        });
    });

    describe("deleteById", () => {
        before(() => {
            stub = sandbox.stub(PropertyDao.prototype, "delete");
        });

        afterEach(() => {
            stub.resetHistory();
        });
        it("when an error is thrown then send failure with status 500", async () => {
            stub.throws(ERROR);

            const result = await service.deleteById(ID);

            expect(stub).calledOnceWith(ID);
            expect(spyFailure).calledOnceWith(500, ERROR.message);
            expect(result).to.equal(spyFailure.returnValues[0]);
        });

        it("should delete property and send status 200", async () => {
            const result = await service.deleteById(ID);

            expect(spySuccess).calledOnceWith(
                200,
                `Successfully deleted property`
            );
            expect(result).to.equal(spySuccess.returnValues[0]);
        });
    });
});
