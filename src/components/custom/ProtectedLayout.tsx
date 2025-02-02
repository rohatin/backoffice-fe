import { Outlet } from "@tanstack/react-router"
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar"
import { AccesiblePaths } from "@/components/custom/sidebar/AccesiblePaths"
import { UserProfile } from "@/components/custom/sidebar/UserProfile"
import { MobileNav } from "@/components/custom/sidebar/MobileNav"
import { useSession } from "@hono/auth-js/react"

export const ProtectedLayout = () => {
  const { data: session } = useSession() ?? {}
  const user = session?.user
  if (!user) return null

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent>
            <div className="p-4 border-b">
              <UserProfile user={user} />
            </div>
            <div className="flex-grow overflow-auto py-4">
              <AccesiblePaths user={user} />
            </div>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1">
          <div className="md:hidden">
            <MobileNav user={user} />
          </div>
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}