import { Hono } from "hono"
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js"
import api from 'backoffice-api-sdk'
import Credentials from "@auth/core/providers/credentials"
import { baseConnection } from "../lib/constant"

const app = new Hono({ strict: false }).basePath('/')


app.use("*", initAuthConfig(c => ({
  secret: c.env.AUTH_SECRET,
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
              ...response.data.data.user, 
              ...response.data.data,
              id: response.data.data.user.id.toString(),
              expiresAt: response.data.data.tokenExpires,
              accessToken: response.data.data.token
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
        token.refreshToken = user.refreshToken
        token.expiresAt = user.expiresAt
        token.userData = {...user, id: Number(user.id), email: user.email!}
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.userData = token.userData
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
        session.expiresAt = token.expiresAt
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  session: {
    strategy: "jwt"
  }
})))

app.use("/api/auth/*", authHandler())

app.use("/api/*", verifyAuth())

app.get("/api/protected", async (c)=> {
    const auth = c.get("authUser")
    return c.json(auth)
})


export default app