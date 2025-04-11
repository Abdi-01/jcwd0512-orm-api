import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Read token from request header
    const token = req.header("Authorization")?.split(" ")[1];
    console.log(token);

    if (!token) {
      throw "Token not exist";
    }

    // Verify token data
    const checkToken = verify(token, process.env.TOKEN_KEY || "secretKey");
    console.log(checkToken);

    res.locals.data = checkToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
