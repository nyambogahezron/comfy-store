import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	paymentID: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
		default: false,
	},
});

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
