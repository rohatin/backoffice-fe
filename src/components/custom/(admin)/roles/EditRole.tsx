import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { PermissionDTO } from "backoffice-api-sdk/structures/PermissionDTO"
import { RoleDTO } from "backoffice-api-sdk/structures/RoleDTO"

interface EditRolePermissionsProps {
  role: RoleDTO
  onSuccess: (updatedRole: RoleDTO) => void
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
export default function EditRolePermissions({ role, onSuccess }: EditRolePermissionsProps) {
  const [permissions, setPermissions] = useState<PermissionDTO[]>(role.permissions)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      //TODO add role update
      // onSuccess(updatedRoled)
    } catch (error) {
      console.error("Failed to update role permissions:", error)
    }
  }

  function handlePermissionChange(changedPermission: PermissionDTO) {
    setPermissions((prevPermissions) => {
      const index = prevPermissions.findIndex(
        (p) => p.action === changedPermission.action && p.resource === changedPermission.resource,
      )
      if (index > -1) {
        return prevPermissions.filter((_, i) => i !== index)
      } else {
        return [...prevPermissions, changedPermission]
      }
    })
  }

  //TODO get permissions from api
  const allPermissions: Array<PermissionDTO> = []

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Permissions</h3>
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {allPermissions.map((permission) => (
            <motion.div
              key={`${permission.action}-${permission.resource}`}
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Checkbox
                id={`${permission.action}-${permission.resource}`}
                checked={permissions.some((p) => p.action === permission.action && p.resource === permission.resource)}
                onCheckedChange={() => handlePermissionChange(permission)}
              />
              <label
                htmlFor={`${permission.action}-${permission.resource}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {permission.name}
              </label>
            </motion.div>
          ))}
        </CardContent>
      </Card>
      <div className="flex justify-end pt-4">
        <Button type="submit">Update Permissions</Button>
      </div>
    </motion.form>
  )
}

