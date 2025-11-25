import type { Request, Response } from "express";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors";
import AsyncHandler from "../middleware/AsyncHandler";
import Organization from "../models/Organization.model";

/**
 * @desc Get Current Organization
 * @route GET /api/v1/organization
 * @access Private
 */

export const getCurrentOrganization = AsyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.userId;
	const organization = await Organization.findOne({ user: userId });

	if (!organization) {
		throw new NotFoundError("Organization not found");
	}

	res.status(200).json({ success: true, data: organization });
});

/**
 * @desc Get Organization By ID
 * @route GET /api/v1/organization/:id
 * @access Public
 */

export const GetSingleOrganization = AsyncHandler(async (req: Request, res: Response) => {
	const organization = await Organization.findById(req.params.id);

	if (!organization) {
		throw new NotFoundError("Organization not found");
	}

	res.status(200).json({ success: true, data: organization });
});

/**
 * @desc Get All Organizations
 * @route GET /api/v1/organization
 * @access Public
 */

export const getAllOrganizations = AsyncHandler(async (_req: Request, res: Response) => {
	const organizations = await Organization.find();

	res.status(200).json({ success: true, data: organizations });
});

/**
 * @desc Create Organization
 * @route POST /api/v1/organization
 * @access Private
 */

export const createOrganization = AsyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.userId;
	const organization = await Organization.findOne({ user: userId });

	if (organization) {
		throw new UnauthorizedError("Organization already exists");
	}

	const { name, email, phone, address, city, country, postalCode, website, logo } = req.body;

	if (
		!name ||
		!email ||
		!phone ||
		!address ||
		!city ||
		!country ||
		!postalCode ||
		!website ||
		!logo
	) {
		throw new BadRequestError("Please fill in all fields");
	}

	const newOrganization = new Organization({
		user: userId,
		name,
		email,
		phone,
		address,
		city,
		country,
		postalCode,
		website,
		logo,
	});

	await newOrganization.save();

	res.status(201).json({ success: true, data: newOrganization });
});

/**
 * @desc Update Organization
 * @route PUT /api/v1/organization
 * @access Private
 */

export const updateOrganization = AsyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.userId;
	const organization = await Organization.findOne({ user: userId });

	if (!organization) {
		throw new NotFoundError("Organization not found");
	}

	if (organization.user !== userId) {
		throw new UnauthorizedError("Not authorized to update this organization");
	}

	const { name, email, phone, address, city, country, postalCode, website, logo } = req.body;

	organization.name = name;
	organization.email = email;
	organization.phone = phone;
	organization.address = address;
	organization.city = city;
	organization.country = country;
	organization.postalCode = postalCode;
	organization.website = website;
	organization.logo = logo;

	await organization.save();

	res.status(200).json({ success: true, data: organization });
});

/**
 * @desc Delete Organization
 * @route DELETE /api/v1/organization
 * @access Private
 */

export const deleteOrganization = AsyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.userId;
	const organization = await Organization.findOne({ user: userId });

	if (!organization) {
		throw new NotFoundError("Organization not found");
	}

	if (organization.user !== userId) {
		throw new UnauthorizedError("Not authorized to delete this organization");
	}

	await organization.deleteOne();

	res.status(200).json({ success: true, data: {} });
});
