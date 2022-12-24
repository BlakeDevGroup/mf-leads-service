import { IOwner } from "../IOwner";
import { query } from "../../common/query/PostGresQuery";
import { IQuery } from "../../common/IQuery";

export default class OwnerQuery implements IQuery {
    private tableName: string;

    constructor(tableName = "owners") {
        this.tableName = tableName;
    }

    async create(owner: IOwner): Promise<string> {
        const sql = `INSERT INTO "${this.tableName}" (name, first_name, last_name, email, entity, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;

        const { rows } = await query(sql, [
            owner.name,
            owner.first_name,
            owner.last_name,
            owner.email,
            owner.entity,
            owner.phone_number,
        ]);

        return rows[0];
    }
    async read(id: string): Promise<any> {
        const sql = `SELECT * FROM "${this.tableName}" WHERE id = $1`;

        const { rows } = await query(sql, [id]);

        return rows[0];
    }

    async delete(id: string): Promise<any> {
        const sql = `DELETE FROM "${this.tableName}" WHERE id = $1`;

        await query(sql, [id]);
    }

    async readAll(): Promise<any> {
        const sql = `SELECT * FROM "${this.tableName}"`;

        const { rows } = await query(sql, []);
        return rows;
    }
    async update(id: string, owner: Partial<IOwner>): Promise<any> {
        const sql = `UPDATE "${this.tableName}" SET name = $1, email = $2, entity = $3, phone_number = $4 WHERE id = $5 RETURNING *`;

        const { rows } = await query(sql, [
            owner.name,
            owner.email,
            owner.entity,
            owner.phone_number,
            id,
        ]);

        return rows[0];
    }
    async readBy(property: string, value: string): Promise<any> {
        const sql = `SELECT * FROM "${this.tableName}" WHERE ${property} = ${value}`;

        const { rows } = await query(sql, []);

        return rows;
    }
}
