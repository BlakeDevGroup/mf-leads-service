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
}
