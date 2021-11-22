import { Router } from "express";
import PropertyController from "../controllers/PropertyController";

const propertyController = new PropertyController();
const PropertyRouter = Router();

PropertyRouter.get("/", propertyController.listProperties.bind(propertyController));

PropertyRouter.post(
  "/",
  propertyController.createProperty.bind(propertyController)
);
export default PropertyRouter;
