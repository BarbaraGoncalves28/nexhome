export type UserRole =
  | "ADMIN"
  | "BROKER"
  | "CLIENT";

export type TokenPayload = {
  userId: string;
  email: string;
  role: UserRole;
};