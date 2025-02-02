
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import TransactionTypePieChart from "./TransactionTypePieChart"
import TransactionHistory from "../../TransactionHistory"
import { TransactionDTO } from "backoffice-api-sdk/structures/TransactionDTO"
import { UserDTO } from "backoffice-api-sdk/structures/UserDTO"
import BalanceOverTime from "./BalanceOverTime"

interface ExpandedUserViewProps {
  user: UserDTO
  transactions: TransactionDTO[]
}

export default function ExpandedUserView({ user, transactions }: ExpandedUserViewProps) {
  const [isBlocked, setIsBlocked] = useState(false)
  const [showChangeNameDialog, setShowChangeNameDialog] = useState(false)
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState("")

  const handleChangeName = () => {
    // Implement name change logic here
    console.log(`Changing name to: ${newName}`)
    setShowChangeNameDialog(false)
  }

  const handleChangePassword = () => {
    // Implement password change logic here
    console.log(`Changing password to: ${newPassword}`)
    setShowChangePasswordDialog(false)
  }

  const handleBlock = () => {
    // Implement block logic here
    console.log(`Blocking user: ${user.id}`)
    setIsBlocked(true)
  }

  const handleUnblock = () => {
    // Implement unblock logic here
    console.log(`Unblocking user: ${user.id}`)
    setIsBlocked(false)
  }

  const handleDelete = () => {
    // Implement delete logic here
    console.log(`Deleting user: ${user.id}`)
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div>
              {/* <CardTitle>{user.name}</CardTitle> */}
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">User Actions</h3>
              <div className="flex gap-2">
                <Dialog open={showChangeNameDialog} onOpenChange={setShowChangeNameDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Change Name</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Name</DialogTitle>
                      <DialogDescription>Enter the new name for the user.</DialogDescription>
                    </DialogHeader>
                    <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
                    <DialogFooter>
                      <Button onClick={handleChangeName}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={showChangePasswordDialog} onOpenChange={setShowChangePasswordDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Change Password</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                      <DialogDescription>Enter the new password for the user.</DialogDescription>
                    </DialogHeader>
                    <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <DialogFooter>
                      <Button onClick={handleChangePassword}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {isBlocked ? (
                  <Button variant="outline" onClick={handleUnblock}>
                    Unblock
                  </Button>
                ) : (
                  <Button variant="outline" onClick={handleBlock}>
                    Block
                  </Button>
                )}

                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">User Details</h3>
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionHistory transactions={transactions} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Balance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <BalanceOverTime transactions={transactions} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Types</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionTypePieChart transactions={transactions} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

