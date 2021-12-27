import { INote } from "../INote";
import { IQuery } from "../../common/IQuery";
import Query from "../query/NoteQuery";

export default class NoteDAO {
    private query: IQuery = new Query("notes");

    async create(note: INote) {
        return this.query.create(note);
    }
    async delete(id: string): Promise<any> {
        return this.query.delete(id);
    }

    async read(id: string): Promise<any> {
        return this.query.read(id);
    }

    async readAll(): Promise<any> {
        return this.query.readAll();
    }

    async update(id: string, resource: Partial<INote>): Promise<any> {
        return this.query.update(id, resource);
    }

    async readBy(property: string, value: string): Promise<any> {
        return this.query.readBy(property, value);
    }

    async readNotesByPropertyId(property_id: string) {
        return this.query.readBy("property_id", property_id);
    }
}
