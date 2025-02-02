import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { cn, hasPermission } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { UserDTO } from "backoffice-api-sdk/structures/UserDTO"
import { routeDisplayData, routeRequiredPermissions, RouteIds, RoutePathnames } from "@/lib/routes.config"
import { LucideIcon } from "lucide-react"



export const AccesiblePaths = ({ user }: { user: UserDTO }) => {
  // Filter routes that have display data and meet permission requirements
  const eligibleRoutes = Object.entries(routeDisplayData).filter(([routeId, displayData]) => {
    if (displayData === null) return false // Skip routes without display data
    
    const requiredPermission = routeRequiredPermissions[routeId as RouteIds]
    return hasPermission(user, requiredPermission)
    //this cast should not be necessary with typescript 5.5 and upwards
  }) as Array<[RouteIds, {
    name: string
    icon: LucideIcon
    routeTo: RoutePathnames
  }]>

  return (
    <SidebarMenu>
      {eligibleRoutes.map(([routeId, displayData]) => (
        <SidebarMenuItem key={routeId}>
          <SidebarMenuButton asChild>
            <Link
              to={displayData.routeTo}
              className={cn(
                "flex items-center py-2 px-4 rounded-md transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar",
              )}
            >
              <displayData.icon className="mr-3 h-5 w-5" />
              <span className="text-sm font-medium">{displayData.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}