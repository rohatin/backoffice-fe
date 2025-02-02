import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LockIcon, MailIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { signIn } from "@hono/auth-js/react"
import { useNavigate } from "@tanstack/react-router"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        generateRefreshToken: keepSignedIn,
        callbackUrl: "/",
      })

      if (!result?.error) {
        navigate({ to: "/" })
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred during login")
      console.error(err)
    }
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login to Your Account</h2>
      {error && (
        <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 w-full"
              placeholder="you@example.com"
            />
            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 w-full"
              placeholder="••••••••"
            />
            <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="keepSignedIn" 
            checked={keepSignedIn}
            onCheckedChange={(checked) => setKeepSignedIn(checked as boolean)}
          />
          <Label 
            htmlFor="keepSignedIn" 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Keep me signed in
          </Label>
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          Log In
        </Button>
      </form>
      <div className="mt-6 text-center">
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
          Forgot your password?
        </a>
      </div>
    </div>
  )
}
