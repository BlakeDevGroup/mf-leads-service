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

PropertyRouter.use("/:id*", (req: Request, res, next) => {
    req.body.property_id = req.params.id;
    next();
});

PropertyRouter.get(
    "/:id",
    propertyController.getProperty.bind(propertyController)
);
PropertyRouter.put(
    "/:id",
    propertyController.updateProperty.bind(propertyController)
);
PropertyRouter.delete(
    "/:id",
    propertyController.deleteProperty.bind(propertyController)
);

PropertyRouter.use("/:id/note", NoteRouter);

export default PropertyRouter;
