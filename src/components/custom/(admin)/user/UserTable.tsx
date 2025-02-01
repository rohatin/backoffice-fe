import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EditUserDialog } from "./EditUserDialog"
import { UserDTO } from 'backoffice-api-sdk/structures/UserDTO'
import { DeepPartial } from "@/types/deep-partial.type"

const mockUsers: DeepPartial<UserDTO>[] = [
  {
    id: 1,
    email: "admin@example.com",
    roles: [{ name: "Admin", description: "Full access" }],
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: 2,
    email: "user@example.com",
    roles: [{ name: "User", description: "Limited access" }],
    createdAt: "2023-01-02T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
  {
    id: 3,
    email: "manager@example.com",
    roles: [{ name: "Manager", description: "Moderate access" }],
    createdAt: "2023-01-03T00:00:00Z",
    updatedAt: "2023-01-03T00:00:00Z",
  },
  {
    id: 4,
    email: "support@example.com",
    roles: [{ name: "Support", description: "Customer support access" }],
    createdAt: "2023-01-04T00:00:00Z",
    updatedAt: "2023-01-04T00:00:00Z",
  },
  {
    id: 5,
    email: "developer@example.com",
    roles: [{ name: "Developer", description: "Technical access" }],
    createdAt: "2023-01-05T00:00:00Z",
    updatedAt: "2023-01-05T00:00:00Z",
  },
]

export function UserTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Roles</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{(user.roles ?? []).map((role) => role.name).join(", ")}</TableCell>
            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(user.updatedAt).toLocaleDateString()}</TableCell>
            <TableCell>
              {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
              <EditUserDialog user={user as any} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

