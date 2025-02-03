import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { useTransactionContext } from "../../../../store/TransactionContext"
import { useMemo } from "react"

export default function BalanceOverTime() {
  const { filteredTransactions: transactions } = useTransactionContext()
  
  const balanceData = useMemo(() => {
    return transactions
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .reduce((acc, transaction) => {
        const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0
        const newBalance =
          transaction.type === "deposit" || transaction.type === "credit"
            ? lastBalance + transaction.amount
            : lastBalance - transaction.amount

        acc.push({
          date: new Date(transaction.createdAt),
          balance: Number(newBalance.toFixed(2)),
          formattedDate: new Date(transaction.createdAt).toLocaleDateString(),
        })

        return acc
      }, [] as { date: Date; balance: number; formattedDate: string }[])
  }, [transactions])

  const formatYAxis = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border rounded-lg shadow-lg">
          <p className="text-sm text-muted-foreground">
            {new Date(payload[0].payload.date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="text-lg font-semibold text-primary">
            {formatYAxis(payload[0].value)}
          </p>
        </div>
      )
    }
    return null
  }

  const currentBalance = balanceData[balanceData.length - 1]?.balance ?? 0
  const previousBalance = balanceData[balanceData.length - 2]?.balance ?? 0
  const percentageChange = previousBalance !== 0 
    ? ((currentBalance - previousBalance) / Math.abs(previousBalance) * 100).toFixed(1)
    : '0'

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Balance Over Time
          <span className={`text-sm font-normal ${Number(percentageChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {Number(percentageChange) >= 0 ? '↑' : '↓'} {Math.abs(Number(percentageChange))}%
          </span>
        </CardTitle>
        <CardDescription>Current balance: {formatYAxis(currentBalance)}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={balanceData}
              margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => 
                  new Date(value).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric'
                  })
                }
                tick={{ fontSize: 12 }}
                tickMargin={10}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fontSize: 12 }}
                tickMargin={10}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#colorBalance)"
                dot={false}
                activeDot={{ 
                  r: 6, 
                  fill: "hsl(var(--primary))",
                  strokeWidth: 2,
                  stroke: "hsl(var(--background))"
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

