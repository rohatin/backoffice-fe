import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserDTO } from "backoffice-api-sdk/structures/UserDTO"

export function EditUserDialog({ user }: { user: UserDTO }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleEdit = () => {
    // Here you would typically make an API call to update the user
    console.log("Updating user:", editedUser)
    setIsEditing(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit User" : "User Details"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="roles">Roles</Label>
            <Input id="roles" value={editedUser.roles.map((role) => role.name).join(", ")} disabled />
          </div>
          {isEditing ? (
            <Button onClick={handleEdit}>Save Changes</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit User</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

