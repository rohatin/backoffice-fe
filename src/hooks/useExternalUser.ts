import { useQuery } from '@tanstack/react-query'
import { useConnection } from './useConnection'
import api from 'backoffice-api-sdk'
import { UserDTO } from 'backoffice-api-sdk/structures/UserDTO'

interface UseExternalUserOptions {
  userId: number
  enabled?: boolean
}

export const useExternalUser = ({ userId, enabled = true }: UseExternalUserOptions) => {
  const connection = useConnection()

  return useQuery<UserDTO | null>({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId || connection.isLoading) {
        return null
      }
      const response = await api.functional.users.findById(
        connection.connection,
        userId
      )

      if (!response.success) {
        throw new Error('Failed to fetch user')
      }
      if(!response.data.status){
        throw new Error(`Api error: ${response.data.message}`)
      }
      return response.data.data
    },
    enabled: enabled && !!userId && !connection.isLoading
  })
}