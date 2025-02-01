"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TransactionDTO } from "backoffice-api-sdk/structures/TransactionDTO"

interface TransactionTypePieChartProps {
  transactions: TransactionDTO[]
}

export default function TransactionTypePieChart({ transactions }: TransactionTypePieChartProps) {
  const transactionTypes = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit" || transaction.type === "withdraw") {
        acc[transaction.type] = (acc[transaction.type] || 0) + transaction.amount
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const data = Object.entries(transactionTypes).map(([name, value]) => ({ name, value }))

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Types</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            deposit: {
              label: "Deposits",
              color: COLORS[0],
            },
            withdraw: {
              label: "Withdrawals",
              color: COLORS[1],
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

