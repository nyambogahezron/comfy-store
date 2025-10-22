import dotenv from "dotenv";

dotenv.config();

import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import ConnectDB from "./config/database";
import cookieParser from "./middleware/CookieParser";

const app: Express = express();

//middlewares
import ErrorHandlerMiddleware from "./middleware/ErrorsHandler";
import NotFoundHandler from "./middleware/NotFound";
//routes
import AuthRoutes from "./routes/Auth.routes";
import OrderRoutes from "./routes/Order.routes";
import OrganizationRoutes from "./routes/Organization.routes";
import ProductRoutes from "./routes/Product.routes";
import UserRoutes from "./routes/User.routes";

app.use(express.json());

if (!process.env.JWT_SECRET) {
	throw new Error("JWT_SECRET is not defined");
}
app.use(cookieParser({ secret: process.env.JWT_SECRET }));

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/org", OrganizationRoutes);
app.use("/api/v1/orders", OrderRoutes);

app.get("/", (_req: Request, res: Response) => {
	res.send("Comfy-store API");
});

app.use(ErrorHandlerMiddleware as unknown as express.ErrorRequestHandler);
app.use(NotFoundHandler);

const corsOptions = {
	origin: process.env.CLIENT_URL,
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

async function StartApp() {
	const port = process.env.PORT || 3000;

	try {
		await ConnectDB(process.env.MONGO_URI);

		app.listen(port, () => {
			console.log(`[server]: Server is running at http://localhost:${port}`);
		});
	} catch (error) {
		console.log(error);
	}
}

StartApp();
