import sinonChai from "sinon-chai";
import sinon from "sinon";
import chai, { expect } from "chai";
import Sinon from "sinon";
import PropertyService from "../service/PropertyService";
import PropertyController from "./PropertyController";
import { Response } from "express";
import { createRequest, createResponse } from "node-mocks-http";
chai.use(sinonChai);
let stub: Sinon.SinonStub;
let sandBox: Sinon.SinonSandbox;
let controller: PropertyController;
let status: Sinon.SinonSpy;
let send: Sinon.SinonSpy;
let res: Response;

const ERROR = new Error("ERROR");
const resolved = {
    status: 200,
    data: "resolved",
};

const failed = {
    status: 400,
    error: ERROR,
};

describe("PropertyController", () => {
    before(() => {
        sandBox = sinon.createSandbox();
    });
    after(() => {
        sandBox.restore();
    });
    beforeEach(() => {
        stub = sandBox.stub();
        controller = new PropertyController();

        res = createResponse();

        status = sandBox.spy(res, "status");
        send = sandBox.spy(res, "json");
    });

    afterEach(() => {
        stub.restore();

        status.restore();
        send.restore();
    });

    describe("createProperty", () => {
        it("should call status and send service.add() return value", async () => {
            stub = sandBox
                .stub(PropertyService.prototype, "add")
                .resolves(resolved);

            const body = { value: "value" };
            let request = createRequest({
                body,
            });
            await controller.createProperty(request, res);

            expect(stub).calledOnceWith(body);
            expect(status).calledOnceWith(resolved.status);
            expect(send).calledOnceWith(resolved.data);
        });

        it("when response failed send error", async () => {
            stub = sandBox
                .stub(PropertyService.prototype, "add")
                .resolves(failed);

            const body = { value: "value" };
            let request = createRequest({
                body,
            });
            await controller.createProperty(request, res);

            expect(stub).calledOnceWith(body);
            expect(status).calledOnceWith(failed.status);
            expect(send).calledOnceWith(failed.error);
        });
    });

    describe("updateProperty", () => {
        it("should call status and send service.putById() return value", async () => {
            stub = sandBox
                .stub(PropertyService.prototype, "putById")
                .resolves(resolved);

            const body = {
                property_id: "1",
            };
            let request = createRequest({
                body,
            });

            await controller.updateProperty(request, res);

            expect(stub).calledOnceWith(body.property_id, body);

            expect(status).calledOnceWith(resolved.status);
            expect(send).calledOnceWith(resolved.data);
        });

        it("when response failed send error", async () => {
            stub = sandBox
                .stub(PropertyService.prototype, "putById")
                .resolves(failed);

            const body = {
                property_id: "1",
            };
            let request = createRequest({
                body,
            });
            await controller.updateProperty(request, res);

            expect(status).calledOnceWith(failed.status);
            expect(send).calledOnceWith(failed.error);
        });
    });

    describe("getProperty", () => {
        it("should call status and send service.getById() return value", async () => {
            stub = sandBox
                .stub(PropertyService.prototype, "getById")
                .resolves(resolved);

            const params = {
                id: "1",
            };
            let request = createRequest({
                params,
            });

            await controller.getProperty(request, res);

            expect(stub).calledOnceWith(params.id);

            expect(status).calledOnceWith(resolved.status);
            expect(send).calledOnceWith(resolved.data);
        });

        it("when response failed send error", async () => {
            stub = sandBox
                .stub(PropertyService.prototype, "putById")
                .resolves(failed);

            const body = {
                property_id: "1",
            };
            let request = createRequest({
                body,
            });
            await controller.updateProperty(request, res);

            expect(status).calledOnceWith(failed.status);
            expect(send).calledOnceWith(failed.error);
        });
    });

    describe("listProperties", () => {
        it("should call status and send service.list() return value", async () => {
            stub = sandBox
                .stub(PropertyService.prototype, "list")
                .resolves(resolved);

            const body = {
                property_id: "1",
            };
            let request = createRequest({
                body,
            });

            await controller.listProperties(request, res);

            expect(stub).calledOnceWith();

            expect(status).calledOnceWith(resolved.status);
            expect(send).calledOnceWith(resolved.data);
        });

        it("when response failed send error", async () => {
            stub = sandBox
                .stub(PropertyService.prototype, "list")
                .resolves(failed);

            const body = {
                property_id: "1",
            };
            let request = createRequest({
                body,
            });
            await controller.listProperties(request, res);

            expect(status).calledOnceWith(failed.status);
            expect(send).calledOnceWith(failed.error);
        });
    });

    describe("deleteProperty", () => {
        it("should call status and send service.deleteById() return value", async () => {
            stub = sandBox
                .stub(PropertyService.prototype, "deleteById")
                .resolves(resolved);

            const body = {
                property_id: "1",
            };
            let request = createRequest({
                body,
            });

            await controller.deleteProperty(request, res);

            expect(stub).calledOnceWith(body.property_id);

            expect(status).calledOnceWith(resolved.status);
            expect(send).calledOnceWith(resolved.data);
        });

        it("when response failed send error", async () => {
            stub = sandBox
                .stub(PropertyService.prototype, "deleteById")
                .resolves(failed);

            const body = {
                property_id: "1",
            };
            let request = createRequest({
                body,
            });
            await controller.deleteProperty(request, res);

            expect(status).calledOnceWith(failed.status);
            expect(send).calledOnceWith(failed.error);
        });
    });
});
