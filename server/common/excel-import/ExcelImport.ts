import PropertyDAO from "../../properties/dao/PropertyDao";
import { query } from "../query/PostGresQuery";
import reader from "xlsx";
import fs from "fs";
import { IOwner } from "../../owners/IOwner";
import { IProperty } from "../../properties/IProperty";

const dao = new PropertyDAO();

export const ownersFromPropertyData = async () => {
    try {
        const { rows } = await query(`SELECT * FROM properties`, []);

        const ownerData = rows.map((property: any) => {
            return {
                name: property.owner_name,
                entity: property.owner_entity,
                phone_number: property.owner_number,
                email: property.owner_email,
            };
        });

        var update = `UPDATE properties SET owner_id = (SELECT id from owners where phone_number = $2) WHERE id = $1`;
        // if properties.owner_id == null

        // ownerData.forEach((owner: IOwner) => {
        //     query(
        //         `INSERT INTO "owners" (name, email, entity, phone_number) VALUES ($1, $2, $3, $4) ON CONFLICT (phone_number) DO NOTHING`,
        //         [owner.name, owner.email, owner.entity, owner.phone_number]
        //     );
        // });
    } catch (e: any) {
        console.log(e.message);
    }
};

export const properyDataUpdate = async () => {
    const { rows } = await query(`SELECT * FROM properties`, []);
    let onlyOwner = 0;
    let phoenOwner = 0;
    rows.map((property: any) => {
        if (!property.owner_id) {
            onlyOwner++;
            console.log(property);
        }
        if (!property.owner_id && property.owner_number) {
            phoenOwner++;
            // query(
            //     `UPDATE properties SET owner_id = (SELECT id from owners where phone_number = $2) WHERE id = $1`,
            //     [property.id, property.owner_number]
            // );
        }
    });
    console.log("No Owner_ID: " + onlyOwner);
    console.log("No Owner_ID and Phone#" + phoenOwner);
};
export const readXLS = (filePath: string) => {
    const file = reader.readFile(filePath);

    let data: any = [];

    const sheets = file.SheetNames;

    for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]]
        );
        temp.forEach((res: any) => {
            data.push(res);
        });
    }

    let ownerData = data.map((input: any) => {
        let number: string = "";
        if (input.Number) {
            number = input.Number;
        } else if (input.Number_2) {
            number = input.Number_2;
        } else if (input.Number_3) {
            number = input.Number_3;
        }

        return {
            name: input.Owner,
            number: new String(number).replace(/[^\d]/g, ""),
            email: input.Email,
        };
    });

    // ownerData.forEach((owner: any) => {
    //     query(
    //         `INSERT INTO "owners" (name, email, entity, phone_number) VALUES ($1, $2, $3, $4) ON CONFLICT (name) DO NOTHING`,
    //         [owner.name, owner.email, "", parseInt(owner.number) || null]
    //     );
    // });

    // data.forEach((input: any) => {
    //     query(
    //         `INSERT INTO "properties" (city, state, street, zip_code, units, owner_id) VALUES ($1, $2, $3, $4, $5, (select id from owners where name='${input.Owner}')) ON CONFLICT (street) DO NOTHING`,
    //         [input.City, input.State, input.Street, input.Zip, input.Units]
    //     );
    // });
    // query(
    //     `INSERT INTO "properties" (city, state, street, zip_code, units, owner_id) VALUES ($1, $2, $3, $4, $5, (select id from owners where name='${data[700].Owner}')) ON CONFLICT (street) DO NOTHING`,
    //     [
    //         data[700].City,
    //         data[700].State,
    //         data[700].Street,
    //         data[700].Zip,
    //         data[700].Units,
    //     ]
    // );
};

//INSERT INTO "properties" (city, state, street, zip_code, units, owner_id) VALUES ('asdf', 'asdf', 'asdf', 123456, 2, (select id from owners where name = 'Michael Dorthy')) ON CONFLICT (street) DO NOTHING
