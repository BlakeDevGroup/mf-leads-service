import { IQuery } from "../../common/IQuery";
import { IProperty } from "../IProperty";
import { query } from "../../common/query/PostGresQuery";

export default class PropertyQuery implements IQuery {
    private tableName: string;

    constructor(tableName = "properties") {
        this.tableName = tableName;
    }

    async create(property: IProperty): Promise<string> {
        const sql = `INSERT INTO "${this.tableName}" (city, state, street, zip_code, units) VALUES ($1, $2, $3, $4, $5) RETURNING id`;

        const { rows } = await query(sql, [
            property.city,
            property.state,
            property.street,
            property.zip_code,
            property.units,
        ]);
        return rows[0];
    }

    async delete(id: string): Promise<any> {
        const sql = `DELETE FROM "${this.tableName}" WHERE id = $1`;

        await query(sql, [id]);
    }

    async read(id: string): Promise<IProperty> {
        const sql = `SELECT * FROM "${this.tableName}" WHERE id = $1`;

        const { rows } = await query(sql, [id]);

        return rows[0];
    }

    async readAll(): Promise<IProperty[]> {
        const sql = `SELECT * FROM "${this.tableName}"`;

        const { rows } = await query(sql, []);
        return rows;
    }

    async update(id: string, property: Partial<IProperty>): Promise<IProperty> {
        const sql = `UPDATE "${this.tableName}" SET city = $1, state = $2, street = $3, zip_code = $4, units = $5 WHERE id = $6 RETURNING *`;

        const { rows } = await query(sql, [
            property.city,
            property.state,
            property.street,
            property.zip_code,
            property.units,
            id,
        ]);

        return rows[0];
    }
    async readBy(property: string, value: string): Promise<IProperty[]> {
        const sql = `SELECT * FROM "${this.tableName}" WHERE ${property} = "${value}"`;

        const { rows } = await query(sql, []);

        return rows;
    }
}
