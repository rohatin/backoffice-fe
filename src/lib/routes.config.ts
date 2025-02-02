import { FileRoutesByPath } from "@tanstack/react-router";
import { ActionType } from "backoffice-api-sdk/structures/action-type.enum";
import { ResourceType } from "backoffice-api-sdk/structures/resource-type.enum";
import { Home, LucideIcon, Settings2, Sheet, Users } from "lucide-react";

type ExtractRouteIds<T> = T extends { id: infer Id } ? Id : never;
type ExtractPathnames<T> = T extends { path: infer Path } ? Path : never;

export type RouteIds = ExtractRouteIds<FileRoutesByPath[keyof FileRoutesByPath]>;
export type RoutePathnames = ExtractPathnames<FileRoutesByPath[keyof FileRoutesByPath]>;

export const routeRequiredPermissions: Record<RouteIds, {
  resource: ResourceType,
  action: ActionType
} | null> = {
  '/login/': null,
  '/(protected)/_layout/': null,
  '/(protected)/_layout': null,
  '/(protected)': null,
  '/(protected)/_layout/transaction/': null,
  '/(protected)/_layout/(admin)/edit-roles/': {
    resource: ResourceType.role,
    action: ActionType.update
  },
  '/(protected)/_layout/(admin)/users/': {
    resource: ResourceType.user,
    action: ActionType.view
  },
  '/(protected)/_layout/(admin)/users/expaned-view/$userId': {
    resource: ResourceType.user,
    action: ActionType.view
  },
}

export const routeDisplayData: Record<RouteIds, {
  name: string,
  icon: LucideIcon
  routeTo: RoutePathnames
} | null> = {
  '/login/': null,
  '/(protected)/_layout': null,
  '/(protected)': null,
  '/(protected)/_layout/': {
    name: 'Dashboard',
    icon: Home,
    routeTo: '/'
  },
  '/(protected)/_layout/transaction/': {
    name: 'Transactions',
    icon: Sheet,
    routeTo: '/transaction'
  },
  '/(protected)/_layout/(admin)/edit-roles/': {
    name: 'Roles',
    icon: Settings2,
    routeTo: '/edit-roles'
  },
  '/(protected)/_layout/(admin)/users/': {
    name: 'Users',
    icon: Users,
    routeTo: '/users'
  },
  '/(protected)/_layout/(admin)/users/expaned-view/$userId': null,
  
}