import { useNavigate } from "@tanstack/react-router"
import { useEffect, useMemo } from "react"
import { useSession } from "@hono/auth-js/react"
import { ActionType } from "backoffice-api-sdk/structures/action-type.enum"
import { ResourceType } from "backoffice-api-sdk/structures/resource-type.enum"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: {
    action: ActionType
    resource: ResourceType
  }
}

/**
 * A component that restricts access to its child components based on user authentication status and permissions.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to render if access is granted.
 * @param {number} [props.requiredPermission] - The permission required for access. If omitted, only authentication is required.
 *
 * @returns {React.ReactNode|null} - Returns the child components if access is granted, or null if access is denied.
 *
 * The component checks the user's authentication status and permissions. If the user is not authenticated, 
 * they are redirected to the login page. If a required permission is specified and the user does not have 
 * that permission, they are redirected to the home page. Otherwise, the child components are rendered.
 */

export const ProtectedRoute = ({ children, requiredPermission }: ProtectedRouteProps) => {
  const navigate = useNavigate()
  const sessionData = useSession()
  const { data: session, status } = sessionData ?? {}
  const userPermissions = useMemo(() => (session?.user?.roles?.map(role => role.permissions.map(elm => ({ action: elm.action, resource: elm.resource }))) ?? []).flat(), [session])

  useEffect(() => {
    if (status === 'unauthenticated') {
      navigate({ to: '/login', reloadDocument: true })
      return
    }

    if(status === 'loading') return

    if (requiredPermission && userPermissions.includes(requiredPermission)) {
      navigate({ to: '/', reloadDocument: true })
      return
    }
  }, [status, navigate, requiredPermission, userPermissions])

  if (status !== 'authenticated') return null

  if (requiredPermission && userPermissions.includes(requiredPermission)) return null

  return <>{children}</>
}