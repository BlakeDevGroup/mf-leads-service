import { IAddress } from "../common/IAddress";

export interface IProperty {
    id?: string;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    owner_name: string;
    owner_email: string;
    owner_entity: string;
    owner_number: string;
    units: number;
    notes: string[];
}
