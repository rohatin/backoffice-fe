import { User } from "@auth/core/types"
import { RoleDTO } from "backoffice-api-sdk/structures/RoleDTO"
import { UserDTO } from "backoffice-api-sdk/structures/UserDTO"

declare module "@auth/core/types" {
  interface User extends Omit<AuthUser, 'id'> {
    id: number
    email: string
    accessToken?: string
    refreshToken?: string
    roles: Array<RoleDTO>
    createdAt: string
    updatedAt: string
  }
}

// Type augmentation for session
declare module "@auth/core/types" {
  interface Session {
    accessToken?: string
    user: UserDTO
  }
}

// Type augmentation for JWT
declare module "@auth/core/jwt" {
  interface JWT {
    accessToken?: string
    roles: Array<RoleDTO>
  }
}