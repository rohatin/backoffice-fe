"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TransactionDTO } from "backoffice-api-sdk/structures/TransactionDTO"

interface BalanceOverTimeProps {
  transactions: TransactionDTO[]
}

export default function BalanceOverTime({ transactions }: BalanceOverTimeProps) {
  const balanceData = transactions
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .reduce(
      (acc, transaction) => {
        const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0
        const newBalance =
          transaction.type === "deposit" || transaction.type === "credit"
            ? lastBalance + transaction.amount
            : lastBalance - transaction.amount

        acc.push({
          date: new Date(transaction.createdAt).toLocaleDateString(),
          balance: newBalance,
        })

        return acc
      },
      [] as { date: string; balance: number }[],
    )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            balance: {
              label: "Balance",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceData}>
              <XAxis
                dataKey="date"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" })
                }
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="balance" stroke="var(--color-balance)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

