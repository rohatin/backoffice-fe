import { Outlet } from "@tanstack/react-router"
import { SidebarProvider } from "@/components/ui/sidebar"
import { MobileNav } from "@/components/custom/sidebar/MobileNav"
import { useSession } from "@hono/auth-js/react"
import { AppSidebar } from "./sidebar/AppSidebar"

export const ProtectedLayout = () => {
  const { data: session } = useSession() ?? {}
  const user = session?.userData
  if (!user) return null

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar user={user} />
        <div className="flex flex-col flex-1">
          <header className="h-14 md:hidden flex items-center px-4 border-b">
            <MobileNav user={user} />
            <div className="ml-4">Backoffice</div>
          </header>
          <main className="flex-1 p-6 overflow-auto"><Outlet/></main>
        </div>
      </div>
    </SidebarProvider>
  )
}