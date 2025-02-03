import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PermissionDTO } from "backoffice-api-sdk/structures/PermissionDTO"
import { RoleDTO } from "backoffice-api-sdk/structures/RoleDTO"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ResourceType } from "backoffice-api-sdk/structures/resource-type.enum"
import { ActionType } from "backoffice-api-sdk/structures/action-type.enum"
import { usePermissions } from "../../../../hooks/usePermissions"
import { useQueryClient } from "@tanstack/react-query"
import api from "backoffice-api-sdk"
import { useConnection } from "../../../../hooks/useConnection"
import { toast } from "sonner"

interface EditRolePermissionsProps {
  role: RoleDTO
}

export default function EditRolePermissions({ role }: EditRolePermissionsProps) {
  const [permissions, setPermissions] = useState<PermissionDTO[]>(role.permissions)
  const {data: allPermissions} = usePermissions()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const connection = useConnection()
  const queryClient = useQueryClient()
    

  //there seems to be some hidratation bugs that I am not really aware of
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] })
    }, 10)
    return () => clearTimeout(timeoutId)
  }, [queryClient])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if(isSaving){
        return
      }
      setIsSaving(true)
      if(connection.isLoading){
        return
      }
      const response = await api.functional.roles.updatePermissions(
        connection.connection,
        {
          permissions: permissions.map(elm => elm.id),
          roleId: role.id
        }
      )
      if(!response.success){
        toast.error("Failed to update role permissions")
        return
      }

      if (!response.data.status) {
        toast.error("Api error: " + response.data.message)
        return
      }

      toast.success("Role permissions updated successfully")
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    } catch (error) {
      console.error("Failed to update role permissions:", error)
    }
    finally{
      setIsSaving(false)
    }
  }

  function handlePermissionChange(changedPermission: { action: ActionType; resource: ResourceType }) {
    setPermissions((prevPermissions) => {
      //admin role is not editable
      if(role.name === "admin"){
        return prevPermissions
      }
      const exists = prevPermissions.some(
        (p) => p.action === changedPermission.action && p.resource === changedPermission.resource
      )
  
      if (exists) {
        // Remove the permission if it exists
        return prevPermissions.filter(
          (p) => !(p.action === changedPermission.action && p.resource === changedPermission.resource)
        )
      } else {
        // Add the permission if it doesn't exist
        const newPermission = (allPermissions ?? []).find(
          (p) => p.action === changedPermission.action && p.resource === changedPermission.resource
        )!
        return [...prevPermissions, newPermission]
      }
    })
  }

  const groupedPermissions = useMemo(() => {
    return Object.values(ResourceType).reduce((acc, resource) => {
      acc[resource] = Object.values(ActionType);
      return acc;
    }, {} as Record<string, ActionType[]>);
  }, []);

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="h-[calc(100vh-2rem)] flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="flex-1">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold flex items-center justify-between">
            <span>Edit Role: {role.name}</span>
            <Button type="submit" size="sm" disabled={role.name === "admin"}>{role.name === 'admin' ? 'Admin role is not editable' : 'Save'}</Button>
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search permissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 max-w-md"
            />
          </div>
        </CardHeader>
        <ScrollArea className="h-[calc(100vh-15rem)]">
          <CardContent className="p-6">
            {Object.entries(groupedPermissions).map(([resource, actions]) => (
              <motion.div
                key={resource}
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg font-semibold text-primary mb-4 capitalize">
                  {resource.replace(/_/g, ' ')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {actions.map((action) => (
                    <motion.div
                      key={`${action}-${resource}`}
                      className="flex items-center space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Checkbox
                        id={`${action}-${resource}`}
                        checked={permissions.some(
                          (p) => p.action === action && p.resource === resource
                        )}
                        onCheckedChange={() => handlePermissionChange({
                          action: action,
                          resource: resource as ResourceType
                        })}
                      />
                      <label
                        htmlFor={`${action}-${resource}`}
                        className="text-sm font-medium leading-none cursor-pointer select-none"
                      >
                        {resource} - {action}
                      </label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>
    </motion.form>
  )
}