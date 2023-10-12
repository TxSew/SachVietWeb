import AdminCarts from "../pages/admin/Carts/AdminCarts";
import DetailCarts from "../pages/admin/Carts/DetailCarts";
import CategoryAdmin from "../pages/admin/Category/AdminCategory";
import CreateCategory from "../pages/admin/Category/Createcategory";
import UpdateCategory from "../pages/admin/Category/UpdateCategory";
import AdminCustomer from "../pages/admin/Users/AdminCustomer";
import AdminDiscount from "../pages/admin/Discount/AdminDiscount";
import CreateDiscount from "../pages/admin/Discount/CreateDiscount";
import UpdateDiscount from "../pages/admin/Discount/UpdateProduct";
import ProducerAdmin from "../pages/admin/Producer/AdminProducer";
import CreateProducer from "../pages/admin/Producer/CreateProducer";
import UpdateProducer from "../pages/admin/Producer/UpdateProducer";
import AdminProduct from "../pages/admin/Products/AdminProduct";
import CreateProduct from "../pages/admin/Products/CreateProduct";
import UpdateProduct from "../pages/admin/Products/UpdateProduct";
import AdminStatistical from "../pages/admin/Statistical/AdminStatistical";
import Category from "../pages/clients/Category/Category";
import HomePage from "../pages/clients/Home/Home";
import User from "../pages/clients/User/DashboardUser";
import Auth from "../pages/clients/auth/Auth";
import ChangePassword from "../pages/clients/auth/changePassword";
import { Cart } from "../pages/clients/cart/Cart";
import Checkout from "../pages/clients/cart/checkout/Checkout";
import Payment from "../pages/clients/cart/payment/Payment";
import { Details } from "../pages/clients/details/Details";
import UserInfo from "../pages/clients/User/UserInfo";
import UserAdress from "../pages/clients/User/Useradress";
import UserVi from "../pages/clients/User/Uservi";
import UserMyCart from "../pages/clients/User/Usermycart";
import NavDas from "../pages/clients/User/Navdasb";

const PublicRouter = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/auth",
    component: Auth,
  },
  {
    path: "/changePass",
    component: ChangePassword,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/checkout",

    component: Checkout,
    isRequired: true,
  },

  {
    path: "/checkout/payment",
    component: Payment,
  },
  {
    path: "/products/:id",
    component: Details,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: '/user',
    component: User,

  },
  {
    path: '/user/info',
    component: UserInfo
  },
  {
    path: '/user/adress',
    component: UserAdress
  },
  {
    path: '/user/vi',
    component: UserVi
  },
  {
    path: '/user/mycart',
    component: UserMyCart
  },
  {
    path: '/user/navdas',
    component: NavDas
  }
];
const PrivateRouter = [
  {
    path: "/admin/product",
    component: AdminProduct,
  },
  {
    path: "/admin/createProduct",
    component: CreateProduct,
  },
  {
    path: "/admin/product/:id",
    component: UpdateProduct,
  },
  {
    path: "/admin/category",
    component: CategoryAdmin,
  },
  {
    path: "/admin/createCategory",
    component: CreateCategory,
  },
  {
    path: "/admin/category/:id",
    component: UpdateCategory,
  },
  {
    path: "/admin/producer",
    component: ProducerAdmin,
  },
  {
    path: "/admin/createProducer",
    component: CreateProducer,
  },

  {
    path: "/admin/producer/:id",
    component: UpdateProducer,
  },
  {
    path: "/admin/discount",
    component: AdminDiscount,
  },
  {
    path: "/admin/createDiscount",
    component: CreateDiscount,
  },
  {
    path: "/admin/discount/:id",
    component: UpdateDiscount,
  },

  {
    path: "/admin/orders",
    component: AdminCarts,
  },

  {
    path: "/admin/orders/detail/:id",
    component: DetailCarts,
  },

  {
    path: "/admin/customer",
    component: AdminCustomer,
  },
  {
    path: "/admin/statistical",
    component: AdminStatistical,
  },
];

export { PrivateRouter, PublicRouter };
