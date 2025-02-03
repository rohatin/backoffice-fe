import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TransactionStatus } from 'backoffice-api-sdk/structures/transaction-status.enum'
import { TransactionType } from 'backoffice-api-sdk/structures/transaction-type.enum'
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import Fuse from 'fuse.js'
import { useTransactionContext } from "../../hooks/useTransactionContext"


interface FilterState {
  search: string
  type: TransactionType | 'all'
  status: TransactionStatus | 'all'
  minAmount: string
  maxAmount: string
}

const ITEMS_PER_PAGE = 10

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

// Add these options before the component
const fuseOptions = {
  keys: ['description', 'type', 'subType'],
  threshold: 0.3,
  includeScore: true,
}


export default function TransactionHistory() {
  const { filteredTransactions: transactions, setFilteredTransactions, originalTransactions } = useTransactionContext()
  
  const resetFilters = () => {
    setFilteredTransactions(originalTransactions)
    setFilters({
      search: '',
      type: 'all',
      status: 'all',
      minAmount: '',
      maxAmount: ''
    })
    setCurrentPage(1)
  }
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: 'all',
    status: 'all',
    minAmount: '',
    maxAmount: ''
  })
  const fuse = useMemo(() => new Fuse(transactions, fuseOptions), [transactions])


  const filteredTransactions = useMemo(() => {
    let results = transactions

    if (filters.search) {
      const fuseResults = fuse.search(filters.search)
      results = fuseResults.map(result => result.item)
    }

    return results.filter(transaction => {
      if (filters.type !== 'all' && transaction.type !== filters.type) return false
      if (filters.status !== 'all' && transaction.status !== filters.status) return false
      if (filters.minAmount && transaction.amount < Number(filters.minAmount)) return false
      if (filters.maxAmount && transaction.amount > Number(filters.maxAmount)) return false
      return true
    })
  }, [transactions, filters, fuse])

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredTransactions, currentPage])

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE)


  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="pl-8"
          />
        </div>
        
        <Select
          value={filters.type}
          onValueChange={(value) => setFilters(prev => ({ ...prev, type: value as TransactionType }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {Object.values(TransactionType).map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) => setFilters(prev => ({ ...prev, status: value as TransactionStatus }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.values(TransactionStatus).map((status) => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min amount"
            value={filters.minAmount}
            onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
          />
          <Input
            type="number"
            placeholder="Max amount"
            value={filters.maxAmount}
            onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
          />
        </div>

        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Reset Filters
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedTransactions.map((transaction, index) => (
            <motion.tr
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <span className={`font-medium ${getTypeColor(transaction.type)}`}>
                  {transaction.type}
                </span>
                <span className="text-xs text-gray-500 ml-1">({transaction.subType})</span>
              </TableCell>
              <TableCell className="max-w-md truncate">
                {transaction.description || '-'}
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

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}