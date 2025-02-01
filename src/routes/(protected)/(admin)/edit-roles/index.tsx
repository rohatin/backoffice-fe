import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { RoleDTO } from 'backoffice-api-sdk/structures/RoleDTO'
import { Separator } from '@/components/ui/separator'
import CreateRoleForm from '@/components/custom/(admin)/roles/CreateRoleForm'
import EditRolePermissions from '@/components/custom/(admin)/roles/EditRole'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/(admin)/edit-roles/')({
  component: RolesPage,
})

function RolesPage() {
  const [roles, setRoles] = useState<RoleDTO[]>([])
  const [selectedRole, setSelectedRole] = useState<RoleDTO | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  function handleRoleCreated(newRole: RoleDTO) {
    setRoles((prevRoles) => [...prevRoles, newRole])
    setIsCreating(false)
  }

  function handleRoleUpdated(updatedRole: RoleDTO) {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === updatedRole.id ? updatedRole : role,
      ),
    )
    setSelectedRole(updatedRole)
  }

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Roles Management
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-700">
              Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {roles.map((role) => (
                <motion.li
                  key={role.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={
                      selectedRole?.id === role.id ? 'default' : 'outline'
                    }
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => setSelectedRole(role)}
                  >
                    <div>
                      <p className="font-medium">{role.name}</p>
                      <p className="text-sm text-gray-500 mt-1 truncate">
                        {role.description}
                      </p>
                    </div>
                  </Button>
                </motion.li>
              ))}
            </ul>
            <Separator className="my-6" />
            <Button className="w-full mt-4" onClick={() => setIsCreating(true)}>
              Create New Role
            </Button>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-700">
              {isCreating
                ? 'Create New Role'
                : selectedRole
                  ? `Edit ${selectedRole.name}`
                  : 'Select a role'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isCreating ? (
              <CreateRoleForm
                onSuccess={handleRoleCreated}
                onCancel={() => setIsCreating(false)}
              />
            ) : selectedRole ? (
              <EditRolePermissions
                role={selectedRole}
                onSuccess={handleRoleUpdated}
              />
            ) : (
              <p className="text-gray-500 text-center py-8">
                Select a role to edit or create a new one.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
