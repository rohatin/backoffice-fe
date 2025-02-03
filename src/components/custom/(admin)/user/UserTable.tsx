import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserDTO } from 'backoffice-api-sdk/structures/UserDTO'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useMemo, useState } from "react"
import Fuse from "fuse.js"
import { Button } from "../../../ui/button"
import { toast } from "sonner"

const fuseOptions = {
  keys: ['firstName', 'lastName', 'email', 'roles.name'],
  threshold: 0.3,
  includeScore: true,
}

export function UserTable({users}: {users: UserDTO[]}) {
  const [searchQuery, setSearchQuery] = useState("")
  const fuse = useMemo(() => new Fuse(users, fuseOptions), [users])

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users
    return fuse.search(searchQuery).map(result => result.item)
  }, [fuse, searchQuery, users])

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{(user.roles ?? []).map((role) => role.name).join(", ")}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => toast("TODO: Implement user editing")}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
