import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList
} from '@/components/ui/navigation-menu';
import { Link, Outlet, createRootRoute  } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { handleBeforeRouteLoad } from '../functions/route-handling';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const Route = createRootRoute({
	beforeLoad: handleBeforeRouteLoad,
	component: () => {
    const context = Route.useRouteContext()
    const { isProtected, requiredRole } = context
		return(
			(
				<>
					<NavigationMenu className='p-4 h-fit'>
						<NavigationMenuList className='flex items-center gap-4'>
							<NavigationMenuItem>
								<h1 className='font-bold text-md'>
									Backoffice
								</h1>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link
									to='/'
									className='[&.active]:border-b-2 [&.active]:text-red-500 pb-1 border-red-500'
								>
									<NavigationMenuLink>Home</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link
									to='/login'
									className='[&.active]:border-b-2 [&.active]:text-red-500 pb-1 border-red-500'
								>
									<NavigationMenuLink>Login</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link
									to='/transaction'
									className='[&.active]:border-b-2 [&.active]:text-red-500 pb-1 border-red-500'
								>
									<NavigationMenuLink>Transactions</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link
									to='/edit-roles'
									className='[&.active]:border-b-2 [&.active]:text-red-500 pb-1 border-red-500'
								>
									<NavigationMenuLink>Edit Roles</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link
									to='/users'
									className='[&.active]:border-b-2 [&.active]:text-red-500 pb-1 border-red-500'
								>
									<NavigationMenuLink>Users</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link
									to='/users/expaned-view/$userId'
									className='[&.active]:border-b-2 [&.active]:text-red-500 pb-1 border-red-500'
									params={{ userId: '1' }}
								>
									<NavigationMenuLink>User expanded view</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<hr />
					<div className='container pt-12'>
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
