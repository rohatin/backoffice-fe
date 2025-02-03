import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { getSession } from '@hono/auth-js/react'
import { useTransactions } from '@/hooks/useTransaction'
import ExpandedUserView from '../../../../../components/custom/(admin)/user/ExpandedUserView'
import { ResourceType } from 'backoffice-api-sdk/structures/resource-type.enum'
import { ActionType } from 'backoffice-api-sdk/structures/action-type.enum'
import { useExternalUser } from '../../../../../hooks/useExternalUser'
import { useTransactionContext } from '../../../../../store/TransactionContext'
import { useEffect } from 'react'

export const Route = createFileRoute(
  '/(protected)/_layout/(admin)/users/expaned-view/$userId'
)({
  beforeLoad: async ({ params }) => {
    const session = await getSession()


    if(!session){
      return {
        redirect: false
      }
    }


    if(params.userId === session.userData.id.toString()){
      return {
        redirect: false
      }
    }

    console.log({
      param: params.userId,
      userId: session.userData.id.toString(),
      checK: !session.userData.roles.map(elm => elm.permissions).flat().find(elm => elm.action === ActionType.view && elm.resource === ResourceType.admin)
    })
    // Check if user is admin or viewing their own profile
    if (
      !session.userData.roles.map(elm => elm.permissions).flat().find(elm => elm.action === ActionType.view && elm.resource === ResourceType.admin)
    ) {
      return {
        redirect: true
      }
    }
  },
  component: UserExpandedView,
})

export default function UserExpandedView() {
  const context = Route.useRouteContext()
  const { redirect } = context ?? {}
  const { userId } = Route.useParams()
  const {setOriginalTransactions, setFilteredTransactions} = useTransactionContext()
  const navigate = useNavigate()
  const { data: user, isLoading: isUserLoading } = useExternalUser({ 
    userId: parseInt(userId) 
  })
  const { data: transactions, isLoading: isTransactionsLoading } = useTransactions({ userId: parseInt(userId) })
  useEffect(() => {
    if (transactions) {
      setOriginalTransactions(transactions)
      setFilteredTransactions(transactions)
    }
  }, [transactions, setOriginalTransactions, setFilteredTransactions])

  if(redirect) {
    navigate({
      to: '/',
      reloadDocument: true
    })
    return <></>
  }

  if (isUserLoading || isTransactionsLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>User not found</div>
  }

  return <ExpandedUserView user={user}/>
}