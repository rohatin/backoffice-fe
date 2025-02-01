import { createFileRoute } from '@tanstack/react-router'
import { TransactionStatus } from 'backoffice-api-sdk/structures/transaction-status.enum'
import { TransactionSubType } from 'backoffice-api-sdk/structures/transaction-subtype.enum'
import { TransactionType } from 'backoffice-api-sdk/structures/transaction-type.enum'
import { TransactionDTO } from 'backoffice-api-sdk/structures/TransactionDTO'
import { UserDTO } from 'backoffice-api-sdk/structures/UserDTO'
import ExpandedUserView from '../../../components/custom/(admin)/user/ExpandedUserView'

export const Route = createFileRoute('/(admin)/users/expaned-view/$userId')({
  component: UserExpandedView,
})

// Mock user data
const mockUser: UserDTO = {
  id: 1,
  email: "john.doe@example.com",
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-06-01T00:00:00Z",
  roles: []
}

// Mock transaction data
const mockTransactions: TransactionDTO[] = [
  {
    id: 1,
    type: TransactionType.deposit,
    subType: TransactionSubType.reward,
    amount: 100,
    status: TransactionStatus.success,
    userId: 1,
    createdAt: "2023-05-01T10:00:00Z",
    updatedAt: "2023-05-01T10:00:00Z",
  },
  {
    id: 2,
    type: TransactionType.withdraw,
    subType: TransactionSubType.purchase,
    amount: 50,
    status: TransactionStatus.success,
    userId: 1,
    createdAt: "2023-05-15T14:30:00Z",
    updatedAt: "2023-05-15T14:30:00Z",
  },
  {
    id: 3,
    type: TransactionType.deposit,
    subType: TransactionSubType.bonus,
    amount: 25,
    status: TransactionStatus.success,
    userId: 1,
    createdAt: "2023-06-01T09:15:00Z",
    updatedAt: "2023-06-01T09:15:00Z",
  },
  {
    id: 4,
    type: TransactionType.withdraw,
    subType: TransactionSubType.fee,
    amount: 10,
    status: TransactionStatus.success,
    userId: 1,
    createdAt: "2023-06-15T11:45:00Z",
    updatedAt: "2023-06-15T11:45:00Z",
  },
  {
    id: 5,
    type: TransactionType.deposit,
    subType: TransactionSubType.reward,
    amount: 75,
    status: TransactionStatus.success,
    userId: 1,
    createdAt: "2023-07-01T08:00:00Z",
    updatedAt: "2023-07-01T08:00:00Z",
  },
]

export default function UserExpandedView() {
  const { userId } = Route.useParams()

  console.log('Viewing user with ID:', userId)

  return <ExpandedUserView user={mockUser} transactions={mockTransactions} />
}
