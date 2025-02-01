import { createFileRoute } from '@tanstack/react-router'
import { UserTable } from '@/components/custom/(admin)/user/UserTable'
import { NewUserButton } from '@/components/custom/(admin)/user/NewUserButton'

export const Route = createFileRoute('/(protected)/(admin)/users/')({
  component: UsersPage,
})

function UsersPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="space-y-4">
        <NewUserButton />
        <UserTable />
      </div>
    </div>
  )
}
