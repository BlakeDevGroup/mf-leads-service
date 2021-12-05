import sinonChai from "sinon-chai";
import sinon from "sinon";
import chai, { expect } from "chai";
import UserService from "../service/UserService";
import UserController from "./UserController";
import { Response } from "express";
import { createRequest, createResponse } from "node-mocks-http";
import { json } from "body-parser";
import { IErrorPayload } from "../../common/message/MessageService";

chai.use(sinonChai);
let controller: UserController;
let stub: sinon.SinonStub;
let sandBox: sinon.SinonSandbox;
let status: sinon.SinonSpy;
let send: sinon.SinonSpy;
let res: Response;
const ERROR = new Error("ERROR");
const resolved = {
    status: 200,
    data: "resolved",
};

const failed = {
    status: 400,
    error: { message: "ERROR", status: 400 },
};

describe("UserController", () => {
    before(() => {
        sandBox = sinon.createSandbox();

        res = createResponse();

        status = sandBox.spy(res, "status");
        send = sandBox.spy(res, "json");
    });
    beforeEach(() => {
        controller = new UserController();
        stub = sandBox.stub();
    });
    afterEach(() => {
        stub.restore();

        status.resetHistory();
        send.resetHistory();
    });

    after(() => {
        sandBox.restore();
    });
    describe("authenticate", () => {
        process.env.SECRET;
        it("should call status with 200 and send result of service.authenticate()", async () => {
            stub = sandBox
                .stub(UserService.prototype, "authenticate")
                .resolves(resolved);
            const body = { user_name: "value", password: "password" };
            let request = createRequest({
                body,
            });
            await controller.authenticate(request, res);

            expect(stub).calledOnceWith(body.user_name, body.password);
            expect(status).calledOnceWith(resolved.status);
            expect(send).calledOnceWith(resolved.data);
        });

        it("when response failed send error with status 400", async () => {
            stub = sandBox
                .stub(UserService.prototype, "authenticate")
                .resolves(failed);

            const body = { user_name: "value", password: "password" };
            let request = createRequest({
                body,
            });

            await controller.authenticate(request, res);

            expect(status).calledOnceWith(failed.status);
            expect(send).calledOnceWith(failed.error);
        });
    });
});
