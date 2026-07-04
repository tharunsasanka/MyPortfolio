import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export type JwtAdminPayload = {
  adminId: string;
  email: string;
  role: "admin";
};

export function signAdminToken(payload: JwtAdminPayload) {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, env.jwtSecret, options);
}

export function verifyAdminToken(token: string) {
  return jwt.verify(token, env.jwtSecret) as JwtAdminPayload;
}