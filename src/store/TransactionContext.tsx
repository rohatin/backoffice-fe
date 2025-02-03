import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { TransactionDTO } from 'backoffice-api-sdk/structures/TransactionDTO'

interface TransactionContextType {
  filteredTransactions: TransactionDTO[]
  setFilteredTransactions: (transactions: TransactionDTO[]) => void
  originalTransactions: TransactionDTO[]
  setOriginalTransactions: (transactions: TransactionDTO[]) => void
}

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export const TransactionProvider = ({ children, initialTransactions = [] }: { 
  children: ReactNode
  initialTransactions?: TransactionDTO[] 
}) => {
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionDTO[]>(initialTransactions)
  const [originalTransactions, setOriginalTransactions] = useState<TransactionDTO[]>(initialTransactions)

  useEffect(() => {
    setFilteredTransactions(initialTransactions)
    setOriginalTransactions(initialTransactions)
  }, [initialTransactions])

  return (
    <TransactionContext.Provider value={{
      filteredTransactions,
      setFilteredTransactions,
      originalTransactions,
      setOriginalTransactions
    }}>
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => {
  const context = useContext(TransactionContext)
  if (context === undefined) {
    throw new Error('useTransactionContext must be used within a TransactionProvider')
  }
  return context
}