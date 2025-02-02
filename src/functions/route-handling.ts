import { ParsedLocation, RouteMatch } from "@tanstack/react-router";
import { ActionType } from "backoffice-api-sdk/structures/action-type.enum";
import { ResourceType } from "backoffice-api-sdk/structures/resource-type.enum";
import { routeRequiredPermissions } from "../lib/routes.config";
import { RouteIds } from "../lib/routes.config";
export const handleBeforeRouteLoad = ({matches}: {location: ParsedLocation, matches: RouteMatch<RouteIds, unknown, unknown, unknown, unknown, unknown, unknown>[]}): {
  isProtected: boolean;
  requiredRole: {
    action: ActionType;
    resource: ResourceType;
  } | null
} => {
  const relevantMatch = matches.filter(elm => elm.id !== '__root__').shift()
  
  if(!relevantMatch) return {
    isProtected: false,
    requiredRole: null
  }
  if(relevantMatch.id.includes('(protected)')) {
    return {
      isProtected: true,
      requiredRole: routeRequiredPermissions[relevantMatch.routeId]
    }
  }
  return {
    isProtected: false,
    requiredRole: null
  }
}