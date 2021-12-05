import sinonChai from "sinon-chai";
import sinon from "sinon";
import chai, { expect } from "chai";
import UserService from "./UserService";
import MessageService from "../../common/message/MessageService";
import { IUser } from "../IUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { clearDBMock } from "../../common/mocks/DBMock";

let spy: sinon.SinonSpy;
let spySuccess: sinon.SinonSpy;
let spyFailure: sinon.SinonSpy;
let spyLog: sinon.SinonSpy;
let sandbox: sinon.SinonSandbox;
let service: UserService;

let USER_DATA: IUser;

const ID = "1";
const ERROR = new Error("ERROR");

describe("UserService", () => {
    before(async () => {
        sandbox = sinon.createSandbox();
        service = new UserService();
        spyFailure = sandbox.spy(MessageService, "sendFailure");
        spySuccess = sandbox.spy(MessageService, "sendSuccess");
        await new Promise((resolve, reject) => {
            bcrypt.hash("asdf", 10, (err, hash) => {
                USER_DATA = {
                    created_date: "10-24-2021",
                    modified_on: "",
                    password: hash,
                    user_name: "asdf",
                    role: "admin",
                };
                service["dao"].create(USER_DATA);
                resolve(true);
            });
        });
        clearDBMock("users");
    });

    after(() => {
        clearDBMock("users");
    });
    beforeEach(() => {
        spyFailure.resetHistory();
        spySuccess.resetHistory();
    });

    after(() => {
        sandbox.restore();
    });
    describe("authentice", () => {
        it("should sendFailure when user_name does not exist", async () => {
            await service.authenticate("asdfx", "asdf");

            expect(spyFailure).calledOnce;
            expect(spyFailure.args[0][0]).equals(400);
        });

        it("should sendFailure when password is incorrect", async () => {
            await service.authenticate("asdf", "wrong_pass");

            expect(spyFailure).calledOnce;
            expect(spyFailure.args[0][0]).equals(400);
        });
        it("should sendSuccess when user_name exists", async () => {
            process.env.SECRET = "asdf";
            await service.authenticate("asdf", "asdf");

            expect(spySuccess).calledOnce;
            expect(spySuccess).calledOnceWith(
                200,
                jwt.sign(
                    await service.dao.readBy("user_name", "asdf"),
                    process.env.SECRET
                )
            );
        });
    });
});
