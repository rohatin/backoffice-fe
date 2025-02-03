import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { RoleDTO } from 'backoffice-api-sdk/structures/RoleDTO'
import { Separator } from '@/components/ui/separator'
import CreateRoleForm from '@/components/custom/(admin)/roles/CreateRoleForm'
import EditRolePermissions from '@/components/custom/(admin)/roles/EditRole'
import { createFileRoute } from '@tanstack/react-router'
import { Shield } from 'lucide-react'
import { useRoles } from '../../../../../hooks/useRoles'
import api from 'backoffice-api-sdk'
import { useConnection } from '../../../../../hooks/useConnection'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

export const Route = createFileRoute('/(protected)/_layout/(admin)/edit-roles/')({
  component: RolesPage,
})

function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<RoleDTO | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const queryClient = useQueryClient()
  const connection = useConnection()
  const {data: roles } = useRoles()

  const handleRoleCreated = async(newRole: RoleDTO)  => {
    try {
      if(connection.isLoading){
        return
      }
      const response = await api.functional.roles.create(connection.connection, {
        name: newRole.name,
        description: newRole.description ?? 'no descrition given',
        permissionIds: [],
      })

      if (!response.success) {
        throw new Error('Failed to create role')
      }

      if (!response.data.status) {
        throw new Error(response.data.message)
      }

      toast.success('Role created successfully')
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      setIsCreating(false)
    } catch (error) {
      toast.error('Failed to create role')
      console.error('Failed to create role:', error)
    }
  }

  function handleRoleUpdated(updatedRole: RoleDTO) {
  }

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
          <h1 className="text-4xl font-bold text-foreground">Roles Management</h1>
        </motion.div>
        
        <div className="grid grid-cols-12 gap-6 flex-1 overflow-hidden">
          <Card className="col-span-12 lg:col-span-3 shadow-lg overflow-hidden flex flex-col">
            <CardHeader className="bg-muted/50 border-b">
              <CardTitle className="text-xl font-semibold">
                Available Roles
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-4">
              <div className="space-y-2">
                {(roles ?? []).map((role) => (
                  <motion.div
                    key={role.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      variant={selectedRole?.id === role.id ? 'default' : 'outline'}
                      className="w-full justify-start text-left h-auto p-4 space-y-1"
                      onClick={() => setSelectedRole(role)}
                    >
                      <div>
                        <p className="font-medium line-clamp-1">{role.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {role.description}
                        </p>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
              <Separator className="my-6" />
              <Button 
                className="w-full" 
                onClick={() => setIsCreating(true)}
                size="lg"
              >
                Create New Role
              </Button>
            </CardContent>
          </Card>

          <Card className="col-span-12 lg:col-span-9 shadow-lg overflow-hidden flex flex-col">
            <CardHeader className="bg-muted/50 border-b">
              <CardTitle className="text-xl font-semibold">
                {isCreating
                  ? 'Create New Role'
                  : selectedRole
                    ? `Edit ${selectedRole.name}`
                    : 'Select a role'}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-6">
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
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <Shield className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground">
                    Select a role to edit or create a new one.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}