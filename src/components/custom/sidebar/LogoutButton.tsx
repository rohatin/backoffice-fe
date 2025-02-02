import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "@hono/auth-js/react"
import { useConnection } from "@/hooks/useConnection"
import api from "backoffice-api-sdk"
import { ComponentProps, useCallback } from "react"

type LogoutButtonProps = Omit<ComponentProps<typeof Button>, "onClick">

export const LogoutButton = (props: LogoutButtonProps) => {
  const connection = useConnection()

  const handleLogout = useCallback(async () => {
    try {
      if(connection.isLoading) {
        return
      } 
      await api.functional.auth.logout(connection.connection)
    } catch (error) {
      console.error("Error logging out from API:", error)
    } finally {
      await signOut({
        redirect: true,
        callbackUrl: '/login'
      })
    }
  }, [connection])

  return (
    <Button {...props} onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
    </Button>
  )
}