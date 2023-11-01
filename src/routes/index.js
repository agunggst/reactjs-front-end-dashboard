import Login from "../pages/Login";
import UserManage from "../pages/UserManage";
import ProductManage from "../pages/ProductManage";

export const adminRoutes = [
  {
    path: 'user-manage',
    name: 'User Manage',
    isGuarded: true,
    component: <UserManage />
  },
  {
    path: 'product-manage',
    name: 'Product Manage',
    isGuarded: true,
    component: <ProductManage />
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