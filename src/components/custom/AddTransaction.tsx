"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TransactionSubType } from 'backoffice-api-sdk/structures/transaction-subtype.enum'
import { TransactionType } from 'backoffice-api-sdk/structures/transaction-type.enum'

export default function AddTransactionForm() {
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<TransactionType>(TransactionType.deposit)
  const [subType, setSubType] = useState<TransactionSubType>(TransactionSubType.purchase)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("New transaction:", { amount: Number.parseFloat(amount), type, subType })
    // Reset form
    setAmount("")
    setType(TransactionType.deposit)
    setSubType(TransactionSubType.purchase)
    // You might want to add some feedback for the user here
    alert("Transaction added successfully!")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="type">Transaction Type</Label>
        <Select value={type} onValueChange={(value) => setType(value as TransactionType)}>
          <SelectTrigger>
            <SelectValue placeholder="Select transaction type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(TransactionType).map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="subType">Sub Type</Label>
        <Input
          id="subType"
          value={subType}
          onChange={(e) => setSubType(e.target.value as TransactionSubType)}
          required
        />
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0"
          step="0.01"
        />
      </div>
      <Button type="submit" className="w-full">
        Add Transaction
      </Button>
    </form>
  )
}

