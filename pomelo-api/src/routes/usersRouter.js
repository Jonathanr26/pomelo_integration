import { Router } from "express";
import usersController from "../controllers/usersController.js";

const router = Router();

router.post("/create-user", usersController.createUsers);
router.get("/search-users", usersController.searchUsers);
router.get("/get-user", usersController.getUser);
router.patch("/update-user/:id", usersController.updateUser);

export default router;