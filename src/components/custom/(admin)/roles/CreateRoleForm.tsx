import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { useConnection } from "../../../../hooks/useConnection"
import { useQueryClient } from "@tanstack/react-query"
import api from "backoffice-api-sdk"
import { toast } from "sonner"

interface CreateRoleFormProps {
  onCancel: () => void
}

export default function CreateRoleForm({ onCancel }: CreateRoleFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const queryClient = useQueryClient()
  const connection = useConnection()
  const handleRoleCreated = async()  => {
    try {
      if(connection.isLoading){
        return
      }
      const response = await api.functional.roles.create(connection.connection, {
        name: name,
        description: description ?? 'no descrition given',
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
    } catch (error) {
      toast.error('Failed to create role')
      console.error('Failed to create role:', error)
    }
  }


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      handleRoleCreated()
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

