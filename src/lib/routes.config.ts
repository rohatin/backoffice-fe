import { FileRoutesByPath } from "@tanstack/react-router";
import { ActionType } from "backoffice-api-sdk/structures/action-type.enum";
import { ResourceType } from "backoffice-api-sdk/structures/resource-type.enum";
import { Home, LucideIcon, Settings2, Sheet, Users } from "lucide-react";

type ExtractRouteIds<T> = T extends { id: infer Id } ? Id : never;

export type RouteIds = ExtractRouteIds<FileRoutesByPath[keyof FileRoutesByPath]>;

export const routeRequiredPermissions: Record<RouteIds, {
  resource: ResourceType,
  action: ActionType
} | null> = {
  '/login/': null,
  '/(protected)/_layout/': null,
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
} | null> = {
  '/login/': null,
  '/(protected)/_layout/': {
    name: 'Dashboard',
    icon: Home
  },
  '/(protected)/_layout/transaction/': {
    name: 'Transactions',
    icon: Sheet
  },
  '/(protected)/_layout/(admin)/edit-roles/': {
    name: 'Roles',
    icon: Settings2
  },
  '/(protected)/_layout/(admin)/users/': {
    name: 'Users',
    icon: Users
  },
  '/(protected)/_layout/(admin)/users/expaned-view/$userId': null,
  
}