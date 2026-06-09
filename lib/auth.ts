import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export type TokenPayload = {
  userId: string;
  email: string;
  role: string;
};

export function generateToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(
      token,
      JWT_SECRET
    ) as TokenPayload;
  } catch {
    return null;
  }
}