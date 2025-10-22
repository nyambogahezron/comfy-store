import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors";
import Token from "../models/Token.model";
import attachCookieToResponse, { verifyJWT } from "../utils/JWT";
import AsyncHandler from "./AsyncHandler";

const authenticate = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const { refreshToken, accessToken } = req.signedCookies;

	if (!refreshToken && !accessToken) {
		throw new UnauthorizedError("Authentication Invalid");
	}

	try {
		if (accessToken) {
			const payload = verifyJWT(accessToken);
			if (typeof payload !== "string") {
				req.user = payload.payload;
			}
			return next();
		}
		const payload = verifyJWT(refreshToken);
		if (typeof payload === "string") {
			throw new UnauthorizedError("Authentication Invalid");
		}

		const existingToken = await Token.findOne({
			user: payload.user.userId,
			refreshToken: payload.token,
		});

		if (!existingToken || !existingToken?.isValid) {
			throw new UnauthorizedError("Authentication Invalid");
		}

		attachCookieToResponse({
			res,
			user: payload.user,
			token: existingToken.token,
		});

		req.user = payload.user;
		next();
	} catch (_error) {
		throw new UnauthorizedError("Authentication Invalid");
	}
});

export default authenticate;
