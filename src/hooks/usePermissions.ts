import { useQuery } from "@tanstack/react-query"
import { useConnection } from "./useConnection"
import { PermissionDTO } from "backoffice-api-sdk/structures/PermissionDTO"
import api from "backoffice-api-sdk"

export const usePermissions = () => {
  const connection = useConnection()

  return useQuery<PermissionDTO[]>({
    queryKey: ["permissions"],
    queryFn: async () => {
      if (connection.isLoading) {
        return []
      }

      const response = await api.functional.roles.all.getAllPermissions(connection.connection)

      if(!response.success){
        throw new Error('Api is unreachable, please try again later')
      }

      if (!response.data.status) {
        throw new Error(`Api error: ${response.data.message}`)
      }

      return response.data.data
    },
    staleTime: 1000 * 60, // Cache for 1 minute
    refetchOnMount: true,
  })
}