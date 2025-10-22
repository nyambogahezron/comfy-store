import Mailgen from "mailgen";
import transporter from "../config/NodeMailer.config";

type emailCategory = "confirmation" | "alert" | "info";

type EmailProps = {
	category: emailCategory;
	name: string;
	email: string;
	subject: string;
	message: string;
};

export default async function SendEmail({
	category = "info",
	name,
	email,
	subject,
	message,
}: EmailProps) {
	const mailGenerator = new Mailgen({
		theme: "default",
		product: {
			name: "Comfy Store",
			link: "https://mailgen.js/",
		},
	});

	const emailTemplate = {
		body: {
			name,
			intro: "Welcome to Test! We're very excited to have you on board.",
			action: {
				instructions: message,
				button: {
					color: "#22BC66",
					text: "Confirm your account",
					link: "https://mailgen.js/",
				},
			},
			outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
		},
	};

	const emailTemplateForConfirmation = {
		body: {
			name,
			intro: "Welcome to Comfy Store! We’re very excited to have you on board.",
			action: {
				instructions: "To get started with Comfy Store, please confirm your email:",
				button: {
					color: "#22BC66",
					text: message,
					link: "https://mailgen.js/",
				},
			},
			outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
		},
	};

	const template =
		subject === "Welcome to Comfy Store" ? emailTemplateForConfirmation : emailTemplate;

	const emailBody = mailGenerator.generate(template);

	const EmailMassage = {
		from: process.env.EMAIL,
		to: email,
		subject: subject,
		html: emailBody,
		inReplyTo: undefined,
		references: undefined,
	};

	try {
		await transporter.sendMail(EmailMassage);
		return { message: "Email sent successfully" };
	} catch (_error) {
		return { message: "Error sending email" };
	}
}
