import { lazy } from "react"
import { Navigate } from "react-router-dom"

const Tasks = lazy(() => import("@/app/tasks/page"))
const Users = lazy(() => import("@/app/users/page"))
const UserSettings = lazy(() => import("@/app/settings/user/page"))
const AccountSettings = lazy(() => import("@/app/settings/account/page"))

export interface RouteConfig {
  path: string
  element: React.ReactNode
  children?: RouteConfig[]
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    element: <Navigate to="users" replace />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/settings/user",
    element: <UserSettings />,
  },
  {
    path: "/settings/account",
    element: <AccountSettings />,
  },
  {
    path: "*",
    element: <Navigate to="users" replace />,
  },
]
