import { sign } from "jsonwebtoken";

export const createToken = (data: any) => {
  return sign(data, process.env.TOKEN_KEY || "secretKey");
};
