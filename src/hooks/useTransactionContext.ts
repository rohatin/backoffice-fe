import { useContext } from "react"
import { TransactionContext } from "../store/TransactionContext"

export const useTransactionContext = () => {
  const context = useContext(TransactionContext)
  if (context === undefined) {
    throw new Error('useTransactionContext must be used within a TransactionProvider')
  }
  return context
} 