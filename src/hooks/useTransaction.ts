import { useQuery } from '@tanstack/react-query'
import { useConnection } from './useConnection'
import { useSession } from '@hono/auth-js/react'
import api from 'backoffice-api-sdk'
import { TransactionDTO } from 'backoffice-api-sdk/structures/TransactionDTO'

interface UseTransactionsOptions {
  userId?: number
}

export const useTransactions = (options: UseTransactionsOptions = {}) => {
  const connection = useConnection()
  const { data: session } = useSession() ?? {}
  const userId = options.userId ?? session?.userData?.id
  return useQuery<TransactionDTO[]>({
    queryKey: ['transactions', userId],
    queryFn: async () => {
      if (!userId || connection.isLoading) {
        return []
      }
      const response = await api.functional.transactions.findAllForUser(
        connection.connection,
        userId
      )

      if (!response.success) {
        throw new Error('Failed to fetch transactions')
      }
      if(!response.data.status){
        throw new Error(`Api error: ${response.data.message}`)
      }
      return response.data.data
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchInterval: 3000
  })
}