/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginIndexImport } from './routes/login/index'
import { Route as protectedLayoutImport } from './routes/(protected)/_layout'
import { Route as protectedLayoutIndexImport } from './routes/(protected)/_layout/index'
import { Route as protectedLayoutTransactionIndexImport } from './routes/(protected)/_layout/transaction/index'
import { Route as protectedLayoutadminUsersIndexImport } from './routes/(protected)/_layout/(admin)/users/index'
import { Route as protectedLayoutadminEditRolesIndexImport } from './routes/(protected)/_layout/(admin)/edit-roles/index'
import { Route as protectedLayoutadminUsersExpanedViewUserIdImport } from './routes/(protected)/_layout/(admin)/users/expaned-view.$userId'

// Create Virtual Routes

const protectedImport = createFileRoute('/(protected)')()

// Create/Update Routes

const protectedRoute = protectedImport.update({
  id: '/(protected)',
  getParentRoute: () => rootRoute,
} as any)

const LoginIndexRoute = LoginIndexImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any)

const protectedLayoutRoute = protectedLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => protectedRoute,
} as any)

const protectedLayoutIndexRoute = protectedLayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => protectedLayoutRoute,
} as any)

const protectedLayoutTransactionIndexRoute =
  protectedLayoutTransactionIndexImport.update({
    id: '/transaction/',
    path: '/transaction/',
    getParentRoute: () => protectedLayoutRoute,
  } as any)

const protectedLayoutadminUsersIndexRoute =
  protectedLayoutadminUsersIndexImport.update({
    id: '/(admin)/users/',
    path: '/users/',
    getParentRoute: () => protectedLayoutRoute,
  } as any)

const protectedLayoutadminEditRolesIndexRoute =
  protectedLayoutadminEditRolesIndexImport.update({
    id: '/(admin)/edit-roles/',
    path: '/edit-roles/',
    getParentRoute: () => protectedLayoutRoute,
  } as any)

const protectedLayoutadminUsersExpanedViewUserIdRoute =
  protectedLayoutadminUsersExpanedViewUserIdImport.update({
    id: '/(admin)/users/expaned-view/$userId',
    path: '/users/expaned-view/$userId',
    getParentRoute: () => protectedLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/(protected)': {
      id: '/(protected)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof protectedImport
      parentRoute: typeof rootRoute
    }
    '/(protected)/_layout': {
      id: '/(protected)/_layout'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof protectedLayoutImport
      parentRoute: typeof protectedRoute
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexImport
      parentRoute: typeof rootRoute
    }
    '/(protected)/_layout/': {
      id: '/(protected)/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof protectedLayoutIndexImport
      parentRoute: typeof protectedLayoutImport
    }
    '/(protected)/_layout/transaction/': {
      id: '/(protected)/_layout/transaction/'
      path: '/transaction'
      fullPath: '/transaction'
      preLoaderRoute: typeof protectedLayoutTransactionIndexImport
      parentRoute: typeof protectedLayoutImport
    }
    '/(protected)/_layout/(admin)/edit-roles/': {
      id: '/(protected)/_layout/(admin)/edit-roles/'
      path: '/edit-roles'
      fullPath: '/edit-roles'
      preLoaderRoute: typeof protectedLayoutadminEditRolesIndexImport
      parentRoute: typeof protectedLayoutImport
    }
    '/(protected)/_layout/(admin)/users/': {
      id: '/(protected)/_layout/(admin)/users/'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof protectedLayoutadminUsersIndexImport
      parentRoute: typeof protectedLayoutImport
    }
    '/(protected)/_layout/(admin)/users/expaned-view/$userId': {
      id: '/(protected)/_layout/(admin)/users/expaned-view/$userId'
      path: '/users/expaned-view/$userId'
      fullPath: '/users/expaned-view/$userId'
      preLoaderRoute: typeof protectedLayoutadminUsersExpanedViewUserIdImport
      parentRoute: typeof protectedLayoutImport
    }
  }
}

// Create and export the route tree

interface protectedLayoutRouteChildren {
  protectedLayoutIndexRoute: typeof protectedLayoutIndexRoute
  protectedLayoutTransactionIndexRoute: typeof protectedLayoutTransactionIndexRoute
  protectedLayoutadminEditRolesIndexRoute: typeof protectedLayoutadminEditRolesIndexRoute
  protectedLayoutadminUsersIndexRoute: typeof protectedLayoutadminUsersIndexRoute
  protectedLayoutadminUsersExpanedViewUserIdRoute: typeof protectedLayoutadminUsersExpanedViewUserIdRoute
}

const protectedLayoutRouteChildren: protectedLayoutRouteChildren = {
  protectedLayoutIndexRoute: protectedLayoutIndexRoute,
  protectedLayoutTransactionIndexRoute: protectedLayoutTransactionIndexRoute,
  protectedLayoutadminEditRolesIndexRoute:
    protectedLayoutadminEditRolesIndexRoute,
  protectedLayoutadminUsersIndexRoute: protectedLayoutadminUsersIndexRoute,
  protectedLayoutadminUsersExpanedViewUserIdRoute:
    protectedLayoutadminUsersExpanedViewUserIdRoute,
}

const protectedLayoutRouteWithChildren = protectedLayoutRoute._addFileChildren(
  protectedLayoutRouteChildren,
)

interface protectedRouteChildren {
  protectedLayoutRoute: typeof protectedLayoutRouteWithChildren
}

const protectedRouteChildren: protectedRouteChildren = {
  protectedLayoutRoute: protectedLayoutRouteWithChildren,
}

const protectedRouteWithChildren = protectedRoute._addFileChildren(
  protectedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof protectedLayoutIndexRoute
  '/login': typeof LoginIndexRoute
  '/transaction': typeof protectedLayoutTransactionIndexRoute
  '/edit-roles': typeof protectedLayoutadminEditRolesIndexRoute
  '/users': typeof protectedLayoutadminUsersIndexRoute
  '/users/expaned-view/$userId': typeof protectedLayoutadminUsersExpanedViewUserIdRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginIndexRoute
  '/': typeof protectedLayoutIndexRoute
  '/transaction': typeof protectedLayoutTransactionIndexRoute
  '/edit-roles': typeof protectedLayoutadminEditRolesIndexRoute
  '/users': typeof protectedLayoutadminUsersIndexRoute
  '/users/expaned-view/$userId': typeof protectedLayoutadminUsersExpanedViewUserIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/(protected)': typeof protectedRouteWithChildren
  '/(protected)/_layout': typeof protectedLayoutRouteWithChildren
  '/login/': typeof LoginIndexRoute
  '/(protected)/_layout/': typeof protectedLayoutIndexRoute
  '/(protected)/_layout/transaction/': typeof protectedLayoutTransactionIndexRoute
  '/(protected)/_layout/(admin)/edit-roles/': typeof protectedLayoutadminEditRolesIndexRoute
  '/(protected)/_layout/(admin)/users/': typeof protectedLayoutadminUsersIndexRoute
  '/(protected)/_layout/(admin)/users/expaned-view/$userId': typeof protectedLayoutadminUsersExpanedViewUserIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/login'
    | '/transaction'
    | '/edit-roles'
    | '/users'
    | '/users/expaned-view/$userId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/login'
    | '/'
    | '/transaction'
    | '/edit-roles'
    | '/users'
    | '/users/expaned-view/$userId'
  id:
    | '__root__'
    | '/(protected)'
    | '/(protected)/_layout'
    | '/login/'
    | '/(protected)/_layout/'
    | '/(protected)/_layout/transaction/'
    | '/(protected)/_layout/(admin)/edit-roles/'
    | '/(protected)/_layout/(admin)/users/'
    | '/(protected)/_layout/(admin)/users/expaned-view/$userId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  protectedRoute: typeof protectedRouteWithChildren
  LoginIndexRoute: typeof LoginIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  protectedRoute: protectedRouteWithChildren,
  LoginIndexRoute: LoginIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/(protected)",
        "/login/"
      ]
    },
    "/(protected)": {
      "filePath": "(protected)",
      "children": [
        "/(protected)/_layout"
      ]
    },
    "/(protected)/_layout": {
      "filePath": "(protected)/_layout.tsx",
      "parent": "/(protected)",
      "children": [
        "/(protected)/_layout/",
        "/(protected)/_layout/transaction/",
        "/(protected)/_layout/(admin)/edit-roles/",
        "/(protected)/_layout/(admin)/users/",
        "/(protected)/_layout/(admin)/users/expaned-view/$userId"
      ]
    },
    "/login/": {
      "filePath": "login/index.tsx"
    },
    "/(protected)/_layout/": {
      "filePath": "(protected)/_layout/index.tsx",
      "parent": "/(protected)/_layout"
    },
    "/(protected)/_layout/transaction/": {
      "filePath": "(protected)/_layout/transaction/index.tsx",
      "parent": "/(protected)/_layout"
    },
    "/(protected)/_layout/(admin)/edit-roles/": {
      "filePath": "(protected)/_layout/(admin)/edit-roles/index.tsx",
      "parent": "/(protected)/_layout"
    },
    "/(protected)/_layout/(admin)/users/": {
      "filePath": "(protected)/_layout/(admin)/users/index.tsx",
      "parent": "/(protected)/_layout"
    },
    "/(protected)/_layout/(admin)/users/expaned-view/$userId": {
      "filePath": "(protected)/_layout/(admin)/users/expaned-view.$userId.tsx",
      "parent": "/(protected)/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
