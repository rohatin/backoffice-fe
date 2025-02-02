import { useSession } from "@hono/auth-js/react"
import { IConnection } from "backoffice-api-sdk"
import { useEffect, useState } from "react"
import { baseConnection } from "../lib/constant"

export const useConnection = () => {
  const { data: session, status } = useSession() ?? { data: null, status: 'loading' }
  const [connection, setConnection] = useState<IConnection | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      setConnection(baseConnection)
      return
    }

    if (status === 'authenticated') {
      if(!baseConnection.headers){
        baseConnection.headers = {}
      }
      baseConnection.headers['Authorization'] = `Bearer ${session?.accessToken}`
      setConnection(baseConnection)
    }
  }, [status, session])

  return {
    connection,
    isLoading: connection === null
  }

}