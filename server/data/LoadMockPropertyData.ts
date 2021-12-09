import propertyData from "./properties.live.json";
import DBMock from "../common/mocks/DBMock";

export const loadPropertyData = () => {
    const properties = propertyData;

    properties.forEach((property) => DBMock["properties"].push(property));
};
