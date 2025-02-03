
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
import TransactionHistory from "../../TransactionHistory"
import { UserDTO } from "backoffice-api-sdk/structures/UserDTO"
import BalanceOverTime from "./BalanceOverTime"
import { useSession } from "@hono/auth-js/react"
import { useConnection } from "@/hooks/useConnection"
import api from "backoffice-api-sdk"
import { Label } from "../../../ui/label"
import { toast } from "sonner"
import TransactionSummary from "./TransactionSummary"

interface ExpandedUserViewProps {
  user: UserDTO
}

export default function ExpandedUserView({ user }: ExpandedUserViewProps) {
  const [isBlocked, setIsBlocked] = useState(false)
  const [showChangeNameDialog, setShowChangeNameDialog] = useState(false)
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false)
  const [newName, setNewName] = useState('')
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const connection = useConnection()
  
  const handleChangePassword = async () => {
    setError(null)
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
  
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }
  
    try {
      const response = await api.functional.auth.change_password.changePassword(
        connection.connection!,
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
        }
      )
  
      if (!response.success) {
        throw new Error('Failed to change password')
      }
  
      if (!response.data.status) {
        throw new Error(response.data.message)
      }
  
      setShowChangePasswordDialog(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const { data: session } = useSession() ?? {}
  const sessionUser = session?.userData
  if (!user) return null

  const handleChangeName = () => {
    // Implement name change logic here
    toast('TODO: implement later')
    setShowChangeNameDialog(false)
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">User Actions</h3>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                <Dialog open={showChangeNameDialog} onOpenChange={setShowChangeNameDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto" variant="outline">Change Name</Button>
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
                    <Button className="w-full sm:w-auto" variant="outline">Change Password</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                      <DialogDescription>Enter your current password and choose a new one.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      {error && (
                        <p className="text-sm text-red-500">{error}</p>
                      )}
                    </div>
                    <DialogFooter>
                      <Button onClick={handleChangePassword}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

             

                {user.id !== sessionUser?.id && (
                  <>
                     {isBlocked ? (
                      <Button className="w-full sm:w-auto" variant="outline" onClick={handleUnblock}>
                        Unblock
                      </Button>
                    ) : (
                      <Button className="w-full sm:w-auto" variant="outline" onClick={handleBlock}>
                        Block
                      </Button>
                    )}
                    <Button className="w-full sm:w-auto" variant="destructive" onClick={handleDelete}>
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">User Details</h3>
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Account created at:</strong> {new Date(user.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <TransactionHistory/>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <BalanceOverTime />
          <TransactionSummary  />
      </div>
    </div>
  )
}

