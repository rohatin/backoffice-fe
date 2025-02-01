import LoginForm from "@/components/custom/LoginForm"
import { createFileRoute } from '@tanstack/react-router'
import { CircleIcon, SquareIcon, TriangleIcon } from "lucide-react"

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <CircleIcon className="absolute top-10 left-10 w-20 h-20 text-white" />
          <SquareIcon className="absolute bottom-10 right-10 w-20 h-20 text-white" />
          <TriangleIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-white" />
        </div>
        <div className="text-white p-12 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6">Welcome to the Backoffice</h1>
          <p className="text-xl mb-8">Check the behavioral pattern of your users</p>
          <div className="text-sm opacity-75 max-w-md mx-auto">
            "Life is a gamble. You never know what cards you'll be dealt next." - Unknown
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <LoginForm />
      </div>
    </div>
  )
}


export const Route = createFileRoute('/login/')({
  component: Login
})
