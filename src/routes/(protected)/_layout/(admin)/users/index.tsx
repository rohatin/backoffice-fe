import { createFileRoute } from '@tanstack/react-router'
import { UserTable } from '@/components/custom/(admin)/user/UserTable'
import { NewUserButton } from '@/components/custom/(admin)/user/NewUserButton'
import { useAllUsers } from '@/hooks/useAllUsers'
import { Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export const Route = createFileRoute('/(protected)/_layout/(admin)/users/')({
  component: UsersPage,
})

function UsersPage() {
  const { data: users } = useAllUsers()
  const queryClient = useQueryClient()
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['all-users'] })
    }, 10)
    return () => clearTimeout(timeoutId)
  }, [queryClient])


  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 w-full">
      <div className="p-6 lg:p-8 flex flex-col h-[calc(100vh-4rem)]">
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Users Management</h1>
        </motion.div>
        
        <div className="space-y-4">
          <NewUserButton />
          <UserTable users={users ?? []} />
        </div>
      </div>
    </div>
  )
}