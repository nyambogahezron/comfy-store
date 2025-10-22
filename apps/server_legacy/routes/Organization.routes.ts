import { Router } from "express";

import {
	createOrganization,
	deleteOrganization,
	GetSingleOrganization,
	getAllOrganizations,
	getCurrentOrganization,
	updateOrganization,
} from "../controllers/Organization.controller";

import authenticate from "../middleware/Authenticate";

const router = Router();

router.get("/org", authenticate, getCurrentOrganization);
router.route("/").get(authenticate, getAllOrganizations).post(authenticate, createOrganization);

router.route("/:id").get(GetSingleOrganization).put(updateOrganization).delete(deleteOrganization);

export default router;
