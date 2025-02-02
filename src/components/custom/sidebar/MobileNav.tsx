import React, { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { UserDTO } from "backoffice-api-sdk/structures/UserDTO"
import { AccesiblePaths } from "./AccesiblePaths"
import { UserProfile } from "./UserProfile"
import { LogoutButton } from "./LogoutButton"

export const MobileNav: React.FC<{ user: UserDTO }> = ({ user }) => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <UserProfile user={user} />
          </div>
          <div className="flex-grow overflow-auto py-4">
            <AccesiblePaths user={user} />
          </div>
          <div className="p-4 border-t">
            <LogoutButton variant="ghost" className="w-full justify-start" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

