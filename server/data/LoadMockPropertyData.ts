import MockQuery from "../common/query/MockQuery";
import propertyData from "./properties.json";

export const loadPropertyData = () => {
    let query = new MockQuery("properties");
    const properties = propertyData.properties;
    propertyData.properties.forEach((property) => query.create(property));
};
