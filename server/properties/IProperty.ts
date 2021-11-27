import { IAddress } from "../common/IAddress";

export interface IProperty {
    address: IAddress;
    owner_id: string;
    owner_name: string;
    owner_email: string;
    owner_number: string;
    price: number;
    units: number;
    sqft: number;
    buildings: number;
    year_built: number;
    notes: string[];
}
