import { User as AuthUser } from "@auth/core/types"
import { AuthSessionDTO } from "backoffice-api-sdk/structures/AuthSessionDTO"
import { RoleDTO } from "backoffice-api-sdk/structures/RoleDTO"
import { UserDTO } from "backoffice-api-sdk/structures/UserDTO"

declare module "@auth/core/types" {
  interface User extends Omit<AuthUser, 'id' | 'email'>, Omit<AuthSessionDTO, 'user'> {
    id: number
    email: string
    accessToken: string
    refreshToken?: string
    roles: Array<RoleDTO>
    expiresAt: number
    createdAt: string
    updatedAt: string
  }
  interface Session {
    accessToken: string
    refreshToken?: string
    expiresAt: number
    userData: UserDTO
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken: string
    refreshToken?: string
    expiresAt: number
    userData: UserDTO
  }
}