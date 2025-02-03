import { useQuery } from "@tanstack/react-query"
import { useConnection } from "./useConnection"
import { RoleDTO } from "backoffice-api-sdk/structures/RoleDTO"
import api from "backoffice-api-sdk"

export const useRoles = () => {
  const connection = useConnection()

  return useQuery<RoleDTO[]>({
    queryKey: ["roles"],
    queryFn: async () => {
      if (connection.isLoading) {
        return []
      }

      const response = await api.functional.roles.findAll(connection.connection)

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
  }, )
}