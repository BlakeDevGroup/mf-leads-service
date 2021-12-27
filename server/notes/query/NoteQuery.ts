import { INote } from "../INote";
import { query } from "../../common/query/PostGresQuery";
import { IQuery } from "../../common/IQuery";

export default class NoteQuery implements IQuery {
    private tableName: string;

    constructor(tableName = "notes") {
        this.tableName = tableName;
    }

    async create(note: INote): Promise<string> {
        const sql = `INSERT INTO "${this.tableName}" (created_by, created_timestamp, modified_by, last_modified, property_id, note) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;

        const { rows } = await query(sql, [
            note.created_by,
            note.created_timestamp,
            note.modified_by,
            note.last_modified,
            note.property_id,
            note.note,
        ]);
        return rows[0];
    }
    async read(id: string): Promise<any> {
        const sql = `SELECT * FROM "${this.tableName}" WHERE id = $1`;

        const { rows } = await query(sql, [id]);

        return rows[0];
    }

    async readAll(): Promise<any> {
        const sql = `SELECT * FROM "${this.tableName}"`;

        const { rows } = await query(sql, []);
        return rows;
    }

    async delete(id: string): Promise<any> {
        const sql = `DELETE FROM "${this.tableName}" WHERE id = $1`;

        await query(sql, [id]);
    }

    async update(id: string, note: Partial<INote>): Promise<any> {
        const sql = `UPDATE "${this.tableName}" SET created_by = $1, created_timestamp = $2, modified_by = $3, last_modified = $4, property_id = $5, note = $6 WHERE id = $7 RETURNING *`;

        const { rows } = await query(sql, [
            note.created_by,
            note.created_timestamp,
            note.modified_by,
            note.last_modified,
            note.property_id,
            note.note,
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
