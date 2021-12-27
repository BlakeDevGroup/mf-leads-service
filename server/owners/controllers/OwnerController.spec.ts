import sinonChai from "sinon-chai";
import sinon from "sinon";
import chai, { expect } from "chai";
import Sinon from "sinon";
import OwnerService from "../service/OwnerService";
import OwnerController from "./OwnerController";
import { Response } from "express";
import { createRequest, createResponse } from "node-mocks-http";

chai.use(sinonChai);

let stub: Sinon.SinonStub;
let sandBox: Sinon.SinonSandbox;
let controller: OwnerController;
let status: Sinon.SinonSpy;
let send: Sinon.SinonSpy;
let res: Response;

const resolved = {
    status: 200,
    data: "resolved",
};

const failed = {
    status: 400,
    error: { status: 400, message: "ERROR" },
};

describe("OwnerController", () => {
    before(() => {
        sandBox = sinon.createSandbox();
    });
    after(() => {
        sandBox.restore();
    });
    beforeEach(() => {
        controller = new OwnerController();

        res = createResponse();

        status = sandBox.spy(res, "status");
        send = sandBox.spy(res, "json");
    });

    afterEach(() => {
        stub.resetHistory();
        status.resetHistory();
        send.resetHistory();
    });

    describe("createOwner", () => {
        before(() => {
            stub = sandBox.stub(OwnerService.prototype, "add");
        });

        after(() => {
            stub.reset();
        });
        it("should call status and send sevice.add() return value", async () => {
            stub.resolves(resolved);
            const body = { value: "value" };

            let request = createRequest({
                body,
            });

            await controller.createOwner(request, res);

            expect(stub).calledOnceWith(body);
            expect(status).calledOnceWith(resolved.status);
            expect(send).calledOnceWith(resolved.data);
        });

        it("when response failed send error", async () => {
            stub.resolves(failed);

            const body = { value: "value" };
            let request = createRequest({
                body,
            });
            await controller.createOwner(request, res);

            expect(stub).calledOnceWith(body);
            expect(status).calledOnceWith(failed.status);
            expect(send).calledOnceWith(failed.error);
        });
    });

    describe("updateOwner", () => {
        before(() => {
            stub = sandBox
                .stub(OwnerService.prototype, "putById")
                .resolves(resolved);
        });

        after(() => {
            stub.restore();
        });
        it("should call status and send service.putById() return value", async () => {
            stub.resolves(resolved);
            const body = {
                owner_id: "1",
            };
            let request = createRequest({
                body,
            });

            await controller.updateOwner(request, res);

            expect(stub).calledOnceWith(body.owner_id, body);

            expect(status).calledOnceWith(resolved.status);
            expect(send).calledOnceWith(resolved.data);
        });

        it("when response failed send error", async () => {
            stub.resolves(failed);
            const body = {
                id: "1",
            };
            let request = createRequest({
                body,
            });
            await controller.updateOwner(request, res);

            expect(status).calledOnceWith(failed.status);
            expect(send).calledOnceWith(failed.error);
        });
    });

    describe("getOwner", () => {
        before(() => {
            stub = sandBox
                .stub(OwnerService.prototype, "getById")
                .resolves(resolved);
        });

        after(() => {
            stub.restore();
        });
        it("should call status and send service.getById() return value", async () => {
            stub.resolves(resolved);

            const params = {
                id: "1",
            };
            let request = createRequest({
                params,
            });

            await controller.getOwner(request, res);

            expect(stub).calledOnceWith(params.id);

            expect(status).calledOnceWith(resolved.status);
            expect(send).calledOnceWith(resolved.data);
        });

        it("when response failed send error", async () => {
            stub.resolves(failed);

            const body = {
                id: "1",
            };
            let request = createRequest({
                body,
            });
            await controller.getOwner(request, res);

            expect(status).calledOnceWith(failed.status);
            expect(send).calledOnceWith(failed.error);
        });
    });

    describe("listOwner", () => {
        before(() => {
            stub = sandBox
                .stub(OwnerService.prototype, "list")
                .resolves(resolved);
        });

        after(() => {
            stub.restore();
        });
        it("should call status and send service.list() return value", async () => {
            stub.resolves(resolved);

            const body = {
                id: "1",
            };
            let request = createRequest({
                body,
            });

            await controller.listOwners(request, res);

            expect(stub).calledOnceWith();

            expect(status).calledOnceWith(resolved.status);
            expect(send).calledOnceWith(resolved.data);
        });

        it("when response failed send error", async () => {
            stub.resolves(failed);

            const body = {
                id: "1",
            };
            let request = createRequest({
                body,
            });
            await controller.listOwners(request, res);

            expect(status).calledOnceWith(failed.status);
            expect(send).calledOnceWith(failed.error);
        });
    });

    describe("deleteOwner", () => {
        before(() => {
            stub = sandBox
                .stub(OwnerService.prototype, "deleteById")
                .resolves(resolved);
        });

        after(() => {
            stub.restore();
        });
        it("should call status and send service.deleteById() return value", async () => {
            stub.resolves(resolved);

            const body = {
                owner_id: 1,
            };
            let request = createRequest({
                body,
            });

            await controller.deleteOwner(request, res);

            expect(stub).calledOnceWith(body.owner_id);

            expect(status).calledOnceWith(resolved.status);
            expect(send).calledOnceWith(resolved.data);
        });

        it("when response failed send error", async () => {
            stub.resolves(failed);

            const body = {
                owner_id: "1",
            };
            let request = createRequest({
                body,
            });
            await controller.deleteOwner(request, res);

            expect(status).calledOnceWith(failed.status);
            expect(send).calledOnceWith(failed.error);
        });
    });
});
