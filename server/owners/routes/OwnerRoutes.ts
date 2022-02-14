import { Router, Request } from "express";
import OwnerController from "../controllers/OwnerController";
import PropertyController from "../../properties/controllers/PropertyController";

const propertyController = new PropertyController();
const ownerController = new OwnerController();
const OwnerRouter = Router();

OwnerRouter.get("/", ownerController.listOwners.bind(ownerController));
OwnerRouter.post("/", ownerController.createOwner.bind(ownerController));

OwnerRouter.use("/:id*", (req: Request, res, next) => {
    req.body.owner_id = req.params.id;
    next();
});

OwnerRouter.get("/:id", ownerController.getOwner.bind(ownerController));
OwnerRouter.put("/:id", ownerController.updateOwner.bind(ownerController));
OwnerRouter.delete("/:id", ownerController.deleteOwner.bind(ownerController));
OwnerRouter.get("/:id/properties", propertyController.getPropertiesByOwnerId.bind(propertyController));

export default OwnerRouter;
