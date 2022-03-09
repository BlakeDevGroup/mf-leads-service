import { IUser } from "../IUser";
import UserDao from "../dao/UserDao";
import MessageService, {
    ResponsePayload,
} from "../../common/message/MessageService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as argon2 from "argon2";

const saltRounds = 10;
export default class UserService {
    dao: UserDao = new UserDao();

    async authenticate(
        email: string,
        password: string
    ): Promise<ResponsePayload> {
        const user: IUser[] = await this.dao.readBy("email", email);

        //argon2.verify(password,)
        if (!user[0] || !(await bcrypt.compare(password, user[0].password))) {
            return MessageService.sendFailure(
                400,
                "username or password does not match"
            );
        }

        if (!process.env.SECRET) {
            return MessageService.sendFailure(
                500,
                "Server error. contact administrator"
            );
        }

        return MessageService.sendSuccess(
            200,
            jwt.sign(user[0], process.env.SECRET)
        );
    }

    async add(resource: IUser): Promise<ResponsePayload> {
        try {
            //hashing, bcrypt, encrypt
            const result = await this.dao.readBy("email", resource.email);

            if (
                resource.email.toLowerCase() === result[0].email.toLowerCase()
            ) {
                return MessageService.sendFailure(
                    400,
                    "An account already exists with this email"
                );
            }
            const salt = bcrypt.genSaltSync(saltRounds);
            const bcryptHash = await bcrypt.hashSync(resource.password, salt);

            const user = await this.dao.create(
                Object.assign({}, resource, { password: bcryptHash })
            );

            return MessageService.sendSuccess(201, user);
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }

    async putById(id: string, resource: Partial<IUser>) {
        try {
            const user = await this.dao.update(id, resource);

            return MessageService.sendSuccess(200, user);
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }

    async getById(id: string) {
        try {
            const user = await this.dao.read(id);

            if (!user)
                return MessageService.sendFailure(
                    404,
                    `No user found with id: ${id}`
                );
            return MessageService.sendSuccess(200, user);
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }

    async list(limit: number, page: number): Promise<any> {
        try {
            const users = await this.dao.readAll();

            return MessageService.sendSuccess(200, users);
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }

    async deleteById(id: string) {
        try {
            await this.dao.delete(id);

            return MessageService.sendSuccess(200, "Successfully deleted user");
        } catch (e: any) {
            return MessageService.sendFailure(500, e.message);
        }
    }
}
