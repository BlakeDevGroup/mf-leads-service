import sinonChai from "sinon-chai";
import sinon from "sinon";
import chai, { expect } from "chai";
import PropertyDao from "../dao/PropertyDao";
import PropertyService from "./PropertyService";
import { IProperty } from "../IProperty";
import MessageService from "../../common/message/MessageService";
import LogService from "../../common/logging/LoggingService";

chai.use(sinonChai);
let spy: sinon.SinonSpy;
let spySuccess: sinon.SinonSpy;
let spyFailure: sinon.SinonSpy;
let spyLog: sinon.SinonSpy;
let sandbox: sinon.SinonSandbox;
let service: PropertyService;

const PROPERTY_DATA: IProperty = {
    address: {
        city: "",
        state: "",
        street: "",
        zip_code: "",
    },
    owner_name: "",
    owner_email: "",
    owner_number: "",
    units: 0,
    notes: [],
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
        it("when an error is thrown then catch error and send failure", async () => {
            let stub = sandbox
                .stub(PropertyDao.prototype, "create")
                .throws(ERROR);

            await service.add(PROPERTY_DATA);

            expect(spyFailure).to.have.been.calledOnceWith(500, ERROR);

            stub.restore();
        });

        it("should send success with status 201 and dao.create() return value", async () => {
            spy = sandbox.spy(PropertyDao.prototype, "create");

            const result = await service.add(PROPERTY_DATA);

            expect(spySuccess).calledOnceWith(201, await spy.returnValues[0]);

            expect(result)
                .to.be.an("object")
                .and.include.keys("status", "data");
            beforeEach;
        });
    });

    describe("list", () => {
        it("when an error is thrown then catch error and send failure", async () => {
            let stub = sandbox
                .stub(PropertyDao.prototype, "readAll")
                .throws(ERROR);

            await service.list(100, 10);
            expect(spyFailure).calledOnceWith(500, ERROR);
            stub.restore();
        });

        it("should send success with status 200 and doa.readall() return value", async () => {
            spy = sandbox.spy(PropertyDao.prototype, "readAll");

            const result = await service.list(100, 10);

            expect(spySuccess).calledOnceWith(200, await spy.returnValues[0]);
            expect(result).to.be.an("object").with.keys("data", "status");
        });
    });

    describe("putById", () => {
        it("when an error is thrown then catch error and send failure", async () => {
            let stub = sandbox
                .stub(PropertyDao.prototype, "update")
                .throws(ERROR);

            const result = await service.putById(ID, PROPERTY_DATA);

            expect(spyFailure).calledOnceWith(500, ERROR);
            stub.restore();
        });

        it("should send success with status 200 and doa.update() return value", async () => {
            spy = sandbox.spy(PropertyDao.prototype, "update");

            const result = await service.putById(ID, PROPERTY_DATA);

            expect(spySuccess).calledOnceWith(200, await spy.returnValues[0]);

            expect(result).to.be.an("object").with.keys("data", "status");
        });
    });

    describe("getById", () => {
        it("when an error is thrown then catch error and send failure", async () => {
            let stub = sandbox
                .stub(PropertyDao.prototype, "read")
                .throws(ERROR);

            const result = await service.getById(ID);

            expect(spyFailure).calledOnceWith(500, ERROR);

            stub.restore();
        });

        it("should send success with status 200 and doa.read() return value", async () => {
            spy = sandbox
                .stub(PropertyDao.prototype, "read")
                .resolves(PROPERTY_DATA);

            const result = await service.getById(ID);

            expect(spySuccess).calledWith(200, await spy.returnValues[0]);

            expect(result).to.be.an("object").with.keys("data", "status");

            spy.restore();
        });

        it("when property is empty then send failure with status 404", async () => {
            let stub = sandbox
                .stub(PropertyDao.prototype, "read")
                .resolves(undefined);

            const result = await service.getById(ID);

            expect(spyFailure).calledOnceWith(
                404,
                `No property found with id: ${ID}`
            );

            expect(result)
                .to.be.an("object")
                .and.include.keys("error", "status");

            stub.restore();
        });
    });

    describe("deleteById", () => {
        it("when an error is thrown then send failure with status 500", async () => {
            let stub = sandbox
                .stub(PropertyDao.prototype, "delete")
                .throws(ERROR);

            await service.deleteById(ID);

            expect(spyFailure).calledOnceWith(500, ERROR);
        });

        it("should delete property and send status 200", async () => {
            const result = await service.deleteById(ID);

            expect(spySuccess).calledOnceWith(
                200,
                `Successfully deleted property`
            );
            expect(result)
                .to.be.an("object")
                .and.include.keys("data", "status");
        });
    });
});
