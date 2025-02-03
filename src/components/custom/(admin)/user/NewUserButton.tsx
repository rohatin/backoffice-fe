import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useConnection } from "@/hooks/useConnection"
import { useRoles } from "@/hooks/useRoles"
import { useQueryClient } from "@tanstack/react-query"
import api from "backoffice-api-sdk"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewUserFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  roleIds: string[]
}

export function NewUserButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<NewUserFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleIds: [],
  })
  
  const connection = useConnection()
  const { data: roles } = useRoles()
  const queryClient = useQueryClient()

    useEffect(() => {
    const timeoutId = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    }, 10)
    return () => clearTimeout(timeoutId)
  }, [queryClient])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (connection.isLoading) return

      const response = await api.functional.auth.admin_register.adminRegister(connection.connection, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        roleIds: formData.roleIds.map(Number)
      })

      if (!response.success) {
        toast.error("Failed to create user")
        return
      }

      if (!response.data.status) {
        toast.error(`Api error: ${response.data.message}`)
        return
      }

      toast.success("User created successfully")
      queryClient.invalidateQueries({ queryKey: ["all-users"] })
      setIsOpen(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roleIds: [],
      })
    } catch (error) {
      console.error("Failed to create user:", error)
      toast.error("An error occurred while creating the user")
    }
  }

  const handleRoleToggle = (roleId: string) => {
    setFormData(prev => {
      const newRoleIds = prev.roleIds.includes(roleId)
        ? prev.roleIds.filter(id => id !== roleId)
        : [...prev.roleIds, roleId]
      return { ...prev, roleIds: newRoleIds }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add New User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label>Roles</Label>
            <div className="space-y-2 border rounded-md p-2">
              {roles?.map((role) => (
                <div key={role.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`role-${role.id}`}
                    checked={formData.roleIds.includes(role.id.toString())}
                    onChange={() => handleRoleToggle(role.id.toString())}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`role-${role.id}`}>{role.name}</label>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full">Create User</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}