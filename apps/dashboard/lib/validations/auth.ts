import * as z from "zod";

export const personalInfoSchema = z.object({
	firstName: z.string().min(2, "First name must be at least 2 characters"),
	lastName: z.string().min(2, "Last name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Password must contain at least one uppercase letter, one lowercase letter, and one number"
		),
});

export const organizationInfoSchema = z.object({
	organizationName: z.string().min(2, "Organization name must be at least 2 characters"),
	role: z.string().min(2, "Role must be at least 2 characters"),
	industry: z.string().min(2, "Industry must be at least 2 characters"),
});

export const verificationInfoSchema = z.object({
	phone: z.string().min(10, "Phone number must be at least 10 characters"),
	address: z.string().min(5, "Address must be at least 5 characters"),
});

export const registrationSchema = personalInfoSchema
	.merge(organizationInfoSchema)
	.merge(verificationInfoSchema);
