import Login from "../pages/Login";
import UserManage from "../pages/UserManage";

export const adminRoutes = [
  {
    path: 'user-manage',
    name: 'User Manage',
    isGuarded: true,
    component: <UserManage />
  },
]

export const blankRoutes = [
  {
    path: 'login',
    name: 'Login',
    isGuarded: false,
    component: <Login />
  },
]