import { Router } from "express";
import cardIssuanceController from "../controllers/cardIssuanceController.js";

const router = Router();

router.post("/create-card/:id", cardIssuanceController.createCard);
router.get("/search-cards", cardIssuanceController.searchCards);
router.get("/get-card", cardIssuanceController.getCard);
router.patch("/update-card/:id", cardIssuanceController.updateCard);

export default router;