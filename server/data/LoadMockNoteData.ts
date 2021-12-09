import noteData from "./notes.live.json";
import DBMock from "../common/mocks/DBMock";

export const loadNotesData = () => {
    const properties = noteData;

    properties.forEach((note) => DBMock["notes"].push(note));
};
