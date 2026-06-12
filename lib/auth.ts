import jwt from "jsonwebtoken";
import { TokenPayload } from "@/types/auth";

const JWT_SECRET =
  process.env.JWT_SECRET!;

export function generateToken(
  payload: TokenPayload
) {
  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(
  token: string
) {
  try {
    return jwt.verify(
      token,
      JWT_SECRET
    ) as TokenPayload;
  } catch {
    return null;
  }
}