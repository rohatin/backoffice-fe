import { AuthConfig } from "@auth/core/types"
import Credentials from "@auth/core/providers/credentials"
import api from 'backoffice-api-sdk'
import { baseConnection } from "./lib/constant"

export const authConfig: AuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        generateRefreshToken: { label: "Keep me signed in", type: "checkbox" }
      },
      async authorize(credentials) {
        try {
          const response = await api.functional.auth.login(baseConnection, {
            email: credentials?.email as string,
            password: credentials?.password as string,
            generateRefreshToken: Boolean(credentials?.generateRefreshToken)
          })

          if (response.success && response.data.status) {
            return {
              id: response.data.data.user.id.toString(),
              email: response.data.data.user.email,
              accessToken: response.data.data.token,
              roles: response.data.data.user.roles,
            }
          }
          
          return null
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.roles = user.roles
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.roles = token.roles
        session.accessToken = token.accessToken
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt"
  }
}

