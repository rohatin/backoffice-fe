import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import { AccesiblePaths } from "./AccesiblePaths"
import { UserDTO } from "backoffice-api-sdk/structures/UserDTO"
import { UserProfile } from "./UserProfile"
import { LogoutButton } from "./LogoutButton"


export function AppSidebar({ user }: { user: UserDTO }) {
  return (
    <Sidebar className="w-64 border-r bg-sidebar hidden md:flex md:flex-col">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <UserProfile user={user} />
        </div>
        <SidebarContent className="flex-grow py-4">
          <AccesiblePaths user={user} />
        </SidebarContent>
        <div className="p-4 border-t">
          <LogoutButton variant="ghost" className="w-full justify-start" />
        </div>
      </div>
    </Sidebar>
  )
}

