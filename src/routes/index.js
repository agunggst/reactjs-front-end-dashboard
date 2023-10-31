import UserManage from "../pages/UserManage";

export const routes = [
  {
    path: '/admin/user-manage',
    name: 'User Manage',
    layout: 'default',
    isGuarded: true,
    component: UserManage
  }
]