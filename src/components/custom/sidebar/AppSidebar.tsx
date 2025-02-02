import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { AccesiblePaths } from "./AccesiblePaths"
import { UserDTO } from "backoffice-api-sdk/structures/UserDTO"
import { UserProfile } from "./UserProfile"

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
          <Button variant="ghost" className="w-full justify-start" onClick={() => console.log("Sign out")}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </Sidebar>
  )
}

