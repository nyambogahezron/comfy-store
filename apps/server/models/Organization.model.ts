import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		postalCode: {
			type: String,
			required: true,
		},
		website: {
			type: String,
			required: true,
		},
		logo: {
			type: String,
			required: true,
		},
		joinedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

const Organization = mongoose.model("Organization", OrganizationSchema);

export default Organization;
