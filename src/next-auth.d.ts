import { User } from "@auth/core/types"
import { RoleDTO } from "backoffice-api-sdk/structures/RoleDTO"

declare module "@auth/core/types" {
  interface User {
    id: string
    email: string
    accessToken?: string
    refreshToken?: string
    roles: Array<RoleDTO>
  }
}

// Type augmentation for session
declare module "@auth/core/types" {
  interface Session {
    accessToken?: string
    user: {
      roles: Array<RoleDTO>
    } & DefaultSession["user"]
  }
}

// Type augmentation for JWT
declare module "@auth/core/jwt" {
  interface JWT {
    accessToken?: string
    roles: Array<RoleDTO>
  }
}