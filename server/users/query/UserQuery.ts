import { IQuery } from "../../common/IQuery";
import { IUser } from "../IUser";
import { query } from "../../common/query/PostGresQuery";

export default class UserQuery implements IQuery {
    private tableName: string;

    constructor(tableName = "users") {
        this.tableName = tableName;
    }

    async create(user: IUser): Promise<string> {
        const sql = `INSERT INTO "${this.tableName}" (first_name, last_name, phone, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id`;

        const { rows } = await query(sql, [
            user.first_name,
            user.last_name,
            user.phone,
            user.email,
            user.password,
            // user.role,
        ]);
        return rows[0];
    }

    async delete(id: string): Promise<any> {
        const sql = `DELETE FROM "${this.tableName}" WHERE id = $1`;

        await query(sql, [id]);  
    }

    async read(id: string): Promise<IUser> {
        const sql = `SELECT * FROM "users" WHERE id = $1`;
        const { rows } = await query(sql, [id]);

        return rows[0];
    }

    async readAll(): Promise<IUser[]> {
        const sql = `SELECT * FROM "${this.tableName}"`;
        const { rows } = await query(sql, []);
        return rows;
    }

    async update(id: string, user: Partial<IUser>): Promise<any> {
        const sql = `UPDATE "${this.tableName}" SET firstName = $1, lastName = $2, phone = $3, email = $4, password = $5, role = $6 WHERE id = $7 RETURNING *`;

        const { rows } = await query(sql, [
            user.first_name,
            user.last_name,
            user.phone,
            user.email,
            user.password,
            // user.role,
            id,
        ]);
        return rows[0];
    }

    async readBy(property: string, value: string): Promise<any> {
        const sql = `SELECT * FROM "${this.tableName}" WHERE ${property} = '${value}'`;

        const { rows } = await query(sql, []);

        return rows;
    }
}
