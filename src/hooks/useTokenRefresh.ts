import { useCallback, useEffect, useRef } from 'react'
import { useSession } from "@hono/auth-js/react"
import api from 'backoffice-api-sdk'
import { baseConnection } from "@/lib/constant"

const REFRESH_INTERVAL = 4 * 60 * 1000 // 4 minutes

export const useTokenRefresh = () => {
  const { data: session, update } = useSession() ?? { data: null, status: 'loading' }
  const refreshTokenTimeoutRef = useRef<NodeJS.Timeout>()

  const refreshToken = useCallback(async () => {
    if (!session?.user?.refreshToken) return

    if(!baseConnection.headers){
      baseConnection.headers = {}
    }
    baseConnection.headers['Authorization'] = `Bearer ${session?.user.refreshToken}`

    try {
      const response = await api.functional.auth.refresh(baseConnection)

      if (response.success && response.data.status) {
        await update({
          ...session,
          accessToken: response.data.data.token,
          user: {
            ...session.user,
            refreshToken: response.data.data.refreshToken
          }
        })
      }
    } catch (error) {
      console.error('Failed to refresh token:', error)
    }
  }, [session, update])

  useEffect(() => {
    const startTokenRefresh = () => {
      if (refreshTokenTimeoutRef.current) {
        clearTimeout(refreshTokenTimeoutRef.current)
      }

      refreshTokenTimeoutRef.current = setTimeout(async () => {
        await refreshToken()
        startTokenRefresh() // Schedule next refresh
      }, REFRESH_INTERVAL)
    }

    if (session?.user?.refreshToken) {
      startTokenRefresh()
    }

    return () => {
      if (refreshTokenTimeoutRef.current) {
        clearTimeout(refreshTokenTimeoutRef.current)
      }
    }
  }, [session, refreshToken])

  return { refreshToken }
}