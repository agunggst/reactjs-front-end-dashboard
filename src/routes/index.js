import Login from "../pages/Login";
import UserManage from "../pages/UserManage";
import ProductManage from "../pages/ProductManage";
import EditUser from "../pages/EditUser";
import NotFound from "../pages/NotFound";
import CreateUser from "../pages/CreateUser";
import CategoryManage from "../pages/CategoryManage";
import InvoiceManage from "../pages/InvoiceManage";
import EditCategory from "../pages/EditCategory";
import CreateCategory from "../pages/CreateCategory";
import CreateProduct from "../pages/CreateProduct";

export const adminRoutes = [
  {
    path: 'user-manage',
    name: 'User Manage',
    isGuarded: true,
    component: <UserManage />
  },
  {
    path: 'user-manage/create-user',
    name: 'User Manage - Create',
    isGuarded: true,
    component: <CreateUser />
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
  {
    path: 'product-manage/create-product',
    name: 'Product Manage - Create',
    isGuarded: true,
    component: <CreateProduct />
  },
  // {
  //   path: 'product-manage/:id',
  //   name: 'Product Manage - Edit Product',
  //   isGuarded: true,
  //   component: <EditProduct />
  // },
  {
    path: 'category-manage',
    name: 'Category Manage',
    isGuarded: true,
    component: <CategoryManage />
  },
  {
    path: 'category-manage/create-category',
    name: 'Category Manage - Create Category',
    isGuarded: true,
    component: <CreateCategory />
  },
  {
    path: 'category-manage/:id',
    name: 'Category Manage - Edit Category',
    isGuarded: true,
    component: <EditCategory />
  },
  {
    path: 'invoice-manage',
    name: 'Invoice Manage',
    isGuarded: true,
    component: <InvoiceManage />
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