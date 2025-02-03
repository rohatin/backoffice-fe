import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTransactionContext } from "../../../../store/TransactionContext"
import { useMemo } from "react"
import { ArrowUpCircle, ArrowDownCircle, TrendingUp, Activity } from "lucide-react"

export default function TransactionSummary() {
  const { filteredTransactions: transactions } = useTransactionContext()
  
  const summary = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.totalDeposits += transaction.amount
        acc.depositCount++
      } else if (transaction.type === "withdraw") {
        acc.totalWithdrawals += transaction.amount
        acc.withdrawCount++
      }
      acc.totalVolume += Math.abs(transaction.amount)
      return acc
    }, {
      totalDeposits: 0,
      totalWithdrawals: 0,
      totalVolume: 0,
      depositCount: 0,
      withdrawCount: 0
    })
  }, [transactions])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const stats = [
    {
      title: "Total Deposits",
      value: formatCurrency(summary.totalDeposits),
      icon: ArrowUpCircle,
      description: `${summary.depositCount} transactions`,
      color: "text-green-500"
    },
    {
      title: "Total Withdrawals",
      value: formatCurrency(summary.totalWithdrawals),
      icon: ArrowDownCircle,
      description: `${summary.withdrawCount} transactions`,
      color: "text-red-500"
    },
    {
      title: "Total Volume",
      value: formatCurrency(summary.totalVolume),
      icon: Activity,
      description: `${transactions.length} total transactions`,
      color: "text-blue-500"
    },
    {
      title: "Average Transaction",
      value: formatCurrency(summary.totalVolume / (transactions.length || 1)),
      icon: TrendingUp,
      description: "Per transaction",
      color: "text-purple-500"
    }
  ]

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>Transaction Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 border rounded-lg bg-background/50">
              <div className="flex items-center gap-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              </div>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}