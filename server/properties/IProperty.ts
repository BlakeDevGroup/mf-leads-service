import { IAddress } from "../common/IAddress";

export interface IProperty {
    id?: string;
    address: IAddress;
    owner_name: string;
    owner_email: string;
    owner_entity: string;
    owner_number: string;
    units: number;
    notes: string[];
}
