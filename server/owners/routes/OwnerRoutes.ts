import { Router, Request } from "express";
import OwnerController from "../controllers/OwnerController";
import PropertyController from "../../properties/controllers/PropertyController";

const propertyController = new PropertyController();
const ownerController = new OwnerController();
const OwnerRouter = Router();

OwnerRouter.get("/", ownerController.listOwners.bind(ownerController));
OwnerRouter.post("/", ownerController.createOwner.bind(ownerController));

OwnerRouter.use("/:owner_id*", (req: Request, res, next) => {
    req.body.owner_id = req.params.owner_id;
    next();
});

OwnerRouter.get("/:owner_id", ownerController.getOwner.bind(ownerController));
OwnerRouter.put("/:owner_id", ownerController.updateOwner.bind(ownerController));
OwnerRouter.delete("/:owner_id", ownerController.deleteOwner.bind(ownerController));

OwnerRouter.get("/:owner_id/properties", propertyController.getPropertiesByOwnerId.bind(propertyController));


export default OwnerRouter;
