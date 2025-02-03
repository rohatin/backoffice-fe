import { Outlet } from "@tanstack/react-router"
import { SidebarProvider } from "@/components/ui/sidebar"
import { MobileNav } from "@/components/custom/sidebar/MobileNav"
import { useSession } from "@hono/auth-js/react"
import { AppSidebar } from "./sidebar/AppSidebar"
import { TransactionProvider } from "../../store/TransactionContext"
import { useTransactions } from "../../hooks/useTransaction"

export const ProtectedLayout = () => {
  const { data: session } = useSession() ?? {}
    const { data: transactions = [] } = useTransactions()

  const user = session?.userData
  if (!user) return null

  return (
    
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar user={user} />
          <div className="flex flex-col flex-1">
            <header className="h-14 md:hidden flex items-center px-4 border-b">
              <MobileNav user={user} />
              <div className="ml-4">Backoffice</div>
            </header>
            <main className="flex-1 overflow-auto">
              <TransactionProvider initialTransactions={transactions}>
                <Outlet/>
              </TransactionProvider>
            </main>
          </div>
        </div>
      </SidebarProvider>
    
    
  )
}