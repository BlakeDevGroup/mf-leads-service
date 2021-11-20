import { Router } from "express";
import CalendarController from "../controllers/PropertyController";

const calendarController = new CalendarController();
const PropertyRouter = Router();

PropertyRouter.get("/", (req, res) => res.status(200).send("Property API"));

PropertyRouter.post(
  "/",
  calendarController.createProperty.bind(calendarController)
);
export default PropertyRouter;
