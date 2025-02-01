import TransactionHistory from "@/components/custom/TransactionHistory"
import AddTransactionForm from "@/components/custom/AddTransaction"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createFileRoute } from '@tanstack/react-router'

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-700">Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionHistory />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-700">Add New Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <AddTransactionForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/transaction/')({
  component: Dashboard
})
