import { IUser } from "../IUser";
import UserDao from "../dao/UserDao";
import MessageService, {
    ResponsePayload,
} from "../../common/message/MessageService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserService {
    dao: UserDao = new UserDao();

    async authenticate(
        username: string,
        password: string
    ): Promise<ResponsePayload> {
        const user: IUser[] = await this.dao.readBy("user_name", username);

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

    async add(resource: IUser) {
        try {
            const user = await this.dao.create(resource);

            return MessageService.sendSuccess(201, user);
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
