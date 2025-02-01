import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { CreateRoleDTO } from 'backoffice-api-sdk/structures/CreateRoleDTO'
import { RoleDTO } from 'backoffice-api-sdk/structures/RoleDTO'

interface CreateRoleFormProps {
  onSuccess: (newRole: RoleDTO) => void
  onCancel: () => void
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
export default function CreateRoleForm({ onSuccess, onCancel }: CreateRoleFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      // biome-ignore lint/correctness/noUnusedVariables: <explanation>
      const newRole: CreateRoleDTO = {
        name,
        description,
        permissionIds: [],
      }
      //TODO api call here
      // onSuccess(fetchedRole)
    } catch (error) {
      console.error("Failed to create role:", error)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        <Label htmlFor="name">Role Name</Label>
        <Input
          id="name"
          placeholder="Enter role name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Role Description</Label>
        <Textarea
          id="description"
          placeholder="Enter role description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full min-h-[100px]"
        />
      </div>
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Role</Button>
      </div>
    </motion.form>
  )
}

