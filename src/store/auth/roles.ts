export type Role = "admin" | "client";

// תצוגה: איך נקרא התפקיד למשתמש
export const ROLE_LABEL: Record<Role, string> = {
  admin: "יועץ",
  client: "לקוח",
};

export const PERMISSIONS = {
  VIEW_CLIENTS: ["admin"] as Role[],
  VIEW_REPORTS: ["admin"] as Role[],
  VIEW_TEMPLATES: ["admin"] as Role[],
  MANAGE_TEMPLATES: ["admin"] as Role[],
  MANAGE_CASES: ["admin"] as Role[],
  VIEW_CASES: ["admin", "client"] as Role[],
} as const;

export type Permission = keyof typeof PERMISSIONS;
export function hasPermission(role: Role | undefined, perm: Permission) {
  return !!role && PERMISSIONS[perm].includes(role);
}
