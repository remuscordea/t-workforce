import { AuthenticationError } from "apollo-server-express";
import { IResolvers } from "@graphql-tools/utils";

type Role = "admin" | "recruiter" | "candidate";

interface User {
  id: string;
  role: Role;
}

export function requireAuth(user: User) {
  if (!user) {
    console.warn("Authentication required but no user found.");
    throw new AuthenticationError("Not authenticated");
  }

  return user;
}

export function requireAuthWithRole(user: User, allowedRoles: Role[]) {
  requireAuth(user);

  if (!allowedRoles.includes(user.role)) {
    console.warn(
      `User with role ${
        user.role
      } is not authorized for this action. Required roles: ${allowedRoles.join(
        ", "
      )}`
    );
    throw new AuthenticationError("Not authorized");
  }

  return user;
}
