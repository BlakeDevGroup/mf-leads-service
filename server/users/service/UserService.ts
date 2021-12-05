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
        const user: IUser = await this.dao.readBy("user_name", username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
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
            jwt.sign(user, process.env.SECRET)
        );
    }
}
