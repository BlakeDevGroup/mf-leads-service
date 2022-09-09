import { Parser } from "json2csv";
import fs from "fs";
import PropertyQuery from "../../properties/query/PropertyQuery";

export class CSVExportService {
    static ExportToCSV(stringifiedJSON: string): string {
        return new Parser({ header: true }).parse(JSON.parse(stringifiedJSON));
    }
}
