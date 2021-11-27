import { Router, Request } from "express";
// import PropertyRouter from "../../notes/routes/NoteRoutes";
import PropertyController from "../controllers/PropertyController";

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

PropertyRouter.use("/id:", (req: Request, res, next) => {
    req.body.id = req.params.id;
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

export default PropertyRouter;
