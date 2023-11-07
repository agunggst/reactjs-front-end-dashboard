import Login from "../pages/Login";
import UserManage from "../pages/UserManage";
import ProductManage from "../pages/ProductManage";
import EditUser from "../pages/EditUser";
import NotFound from "../pages/NotFound";

export const adminRoutes = [
  {
    path: 'user-manage',
    name: 'User Manage',
    isGuarded: true,
    component: <UserManage />
  },
  {
    path: 'user-manage/:id',
    name: 'User Manage - Edit User',
    isGuarded: true,
    component: <EditUser />
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
  {
    path: '*',
    name: 'Not Found',
    isGuarded: false,
    component: <NotFound />
  },
]