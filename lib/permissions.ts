export function isAdmin(
  role: string
) {
  return role === "ADMIN";
}

export function isRealtor(
  role: string
) {
  return role === "REALTOR";
}

export function isClient(
  role: string
) {
  return role === "CLIENT";
}