
import { Outlet, createRootRoute  } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { handleBeforeRouteLoad } from '../functions/route-handling';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useTokenRefresh } from '../hooks/useTokenRefresh';

export const Route = createRootRoute({
	beforeLoad: handleBeforeRouteLoad,
	component: () => {
    const context = Route.useRouteContext()
    const { isProtected, requiredRole } = context

		//necessary for users to be able to refresh their token
		//for feature "keep me signed in"
		useTokenRefresh()

		return(
			(
				<>
					<div className=''>
					{isProtected ? (
					<ProtectedRoute requiredPermission={requiredRole}>
						<Outlet/>
					</ProtectedRoute>
				) : <Outlet/>}
					</div>
					<TanStackRouterDevtools />
				</>
			)
		)
	}
});
