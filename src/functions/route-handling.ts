import { ParsedLocation, RouteMatch } from "@tanstack/react-router";
import { ActionType } from "backoffice-api-sdk/structures/action-type.enum";
import { ResourceType } from "backoffice-api-sdk/structures/resource-type.enum";

export const handleBeforeRouteLoad = ({matches}: {location: ParsedLocation, matches: RouteMatch<unknown, unknown, unknown, unknown, unknown, unknown, unknown>[]}): {
  isProtected: boolean;
  requiredRole: {
    action: ActionType;
    resource: ResourceType;
  } | undefined
} => {
  const relevantMatch = matches.filter(elm => elm.id !== '__root__').shift()
  
  if(!relevantMatch) return {
    isProtected: false,
    requiredRole: undefined
  }
  
  if(relevantMatch.id.includes('(admin)/edit-roles/')) {
    return {
      isProtected: true,
      requiredRole: {
        action: ActionType.view,
        resource: ResourceType.role
      }
    }
  }
  if(relevantMatch.id.includes('(admin)/users/')) {
    return {
      isProtected: true,
      requiredRole: {
        action: ActionType.view,
        resource: ResourceType.user
      }
    }
  }
  if(relevantMatch.id.includes('(protected)')) {
    return {
      isProtected: true,
      requiredRole: undefined
    }
  }
  return {
    isProtected: false,
    requiredRole: undefined
  }
}