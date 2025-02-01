import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TransactionStatus } from 'backoffice-api-sdk/structures/transaction-status.enum'
import { TransactionType } from 'backoffice-api-sdk/structures/transaction-type.enum'
import { TransactionSubType } from 'backoffice-api-sdk/structures/transaction-subtype.enum'
import { TransactionDTO } from 'backoffice-api-sdk/structures/TransactionDTO'
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

// Mock data for transactions
const transactionsMock: TransactionDTO[] = [
  {
    id: 1,
    type: TransactionType.deposit,
    subType: TransactionSubType.purchase,
    amount: 100,
    status: TransactionStatus.success,
    userId: 1,
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-05-01"),
  },
  {
    id: 2,
    type: TransactionType.withdraw,
    subType: TransactionSubType.reward,
    amount: 50,
    status: TransactionStatus.pending,
    userId: 1,
    createdAt: new Date("2023-05-03"),
    updatedAt: new Date("2023-05-03"),
  },
  {
    id: 3,
    type: TransactionType.credit,
    subType: TransactionSubType.bonus,
    amount: 25,
    status: TransactionStatus.success,
    userId: 1,
    createdAt: new Date("2023-05-07"),
    updatedAt: new Date("2023-05-07"),
  },
  {
    id: 4,
    type: TransactionType.adminEnforced,
    subType: TransactionSubType.fee,
    amount: -10,
    status: TransactionStatus.success,
    userId: 1,
    createdAt: new Date("2023-05-10"),
    updatedAt: new Date("2023-05-10"),
  },
]

const getStatusColor = (status: TransactionStatus) => {
  switch (status) {
    case TransactionStatus.success:
      return "bg-green-100 text-green-800"
    case TransactionStatus.pending:
      return "bg-yellow-100 text-yellow-800"
    case TransactionStatus.failed:
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getTypeColor = (type: TransactionType) => {
  switch (type) {
    case TransactionType.deposit:
      return "text-green-600"
    case TransactionType.withdraw:
      return "text-red-600"
    case TransactionType.credit:
      return "text-blue-600"
    case TransactionType.adminEnforced:
      return "text-purple-600"
    default:
      return "text-gray-600"
  }
}

export default function TransactionHistory({transactions}: {transactions: TransactionDTO[]} = {transactions: transactionsMock}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index) => (
          <motion.tr
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <span className={`font-medium ${getTypeColor(transaction.type)}`}>{transaction.type}</span>
              <span className="text-xs text-gray-500 ml-1">({transaction.subType})</span>
            </TableCell>
            <TableCell className={transaction.amount >= 0 ? "text-green-600" : "text-red-600"}>
              ${Math.abs(transaction.amount).toFixed(2)}
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
            </TableCell>
          </motion.tr>
        ))}
      </TableBody>
    </Table>
  )
}
