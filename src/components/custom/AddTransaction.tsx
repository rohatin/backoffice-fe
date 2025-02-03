import { useCallback, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TransactionSubType } from 'backoffice-api-sdk/structures/transaction-subtype.enum'
import { TransactionType } from 'backoffice-api-sdk/structures/transaction-type.enum'
import api from "backoffice-api-sdk"
import { useConnection } from "../../hooks/useConnection"
import { useSession } from "@hono/auth-js/react"
import { TransactionStatus } from "backoffice-api-sdk/structures/transaction-status.enum"
import { toast } from 'sonner'
import { useQueryClient } from "@tanstack/react-query"

export default function AddTransactionForm() {
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<TransactionType>(TransactionType.deposit)
  const [subType, setSubType] = useState<TransactionSubType>(TransactionSubType.purchase)
  const connection = useConnection()
  const { data: session } = useSession() ?? {}
  const [description, setDescription] = useState("")

  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (connection.isLoading || !session?.userData?.id) return

    setIsLoading(true)
    try {
      const response = await api.functional.transactions.create(
        connection.connection,
        {
          amount: Number.parseFloat(amount),
          type,
          subType,
          userId: session.userData.id,
          status: TransactionStatus.pending,
          description: description
        }
      )

      if (!response.success) {
        throw new Error('Api is not responsive, please try again later')
      }
      if(!response.data.status){
        throw new Error(response.data.message || 'Failed to create transaction')
      }

      // Reset form
      setAmount("")
      setType(TransactionType.deposit)
      setSubType(TransactionSubType.purchase)
      await queryClient.invalidateQueries({ queryKey: ['transactions'] })
      
      toast.success("Transaction added successfully!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create transaction')
    } finally {
      setIsLoading(false)
    }
  }, [amount, type, subType, connection, session?.userData?.id, description, queryClient.invalidateQueries])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select value={type} onValueChange={(value) => setType(value as TransactionType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
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

        <div className="space-y-2">
          <Label htmlFor="subType">Sub Type</Label>
          <Select value={subType} onValueChange={(value) => setSubType(value as TransactionSubType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select sub type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(TransactionSubType).map((st) => (
                <SelectItem key={st} value={st}>
                  {st}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
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

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Transaction"}
      </Button>
    </form>
  )
}

