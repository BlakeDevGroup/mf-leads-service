import { Router, Request } from "express";
// import PropertyRouter from "../../notes/routes/NoteRoutes";
import PropertyController from "../controllers/PropertyController";
import NoteRouter from "../../notes/routes/NoteRoutes";
const propertyController = new PropertyController();
const PropertyRouter = Router();

PropertyRouter.get(
    "/",
    propertyController.listProperties.bind(propertyController)
);

PropertyRouter.post(
    "/",
    propertyController.createProperty.bind(propertyController)
);

PropertyRouter.use("/:property_id*", (req: Request, res, next) => {
    req.body.property_id = req.params.property_id;
    next();
});

PropertyRouter.get(
    "/:property_id",
    propertyController.getProperty.bind(propertyController)
);
PropertyRouter.put(
    "/:property_id",
    propertyController.updateProperty.bind(propertyController)
);
PropertyRouter.delete(
    "/:property_id",
    propertyController.deleteProperty.bind(propertyController)
);

PropertyRouter.use("/:property_id/note", NoteRouter);

export default PropertyRouter;
