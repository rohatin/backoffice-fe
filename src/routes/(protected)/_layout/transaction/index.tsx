import TransactionHistory from '@/components/custom/TransactionHistory'
import AddTransactionForm from '@/components/custom/AddTransaction'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import { useTransactionContext } from '../../../../store/TransactionContext'

const Dashboard = () => {
  const { originalTransactions } = useTransactionContext()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">User Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your transactions and account activity</p>
      </div>
      
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-gray-50/50">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Add New Transaction
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <AddTransactionForm />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="border-b bg-gray-50/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Transaction History
              </CardTitle>
              <span className="text-sm text-gray-500">
                {originalTransactions.length} transactions
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <TransactionHistory  />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/(protected)/_layout/transaction/')({
  component: Dashboard,
})
