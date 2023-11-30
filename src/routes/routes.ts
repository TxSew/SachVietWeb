import AdminCarts from '../pages/admin/Carts/AdminCarts';
import DetailCarts from '../pages/admin/Carts/DetailCarts';
import CategoryAdmin from '../pages/admin/Category/AdminCategory';
import CreateCategory from '../pages/admin/Category/Createcategory';
import UpdateCategory from '../pages/admin/Category/UpdateCategory';
import AdminDiscount from '../pages/admin/Discount/AdminDiscount';
import CreateDiscount from '../pages/admin/Discount/CreateDiscount';
import UpdateDiscount from '../pages/admin/Discount/UpdateDiscount';
import ProducerAdmin from '../pages/admin/Producer/AdminProducer';
import CreateProducer from '../pages/admin/Producer/CreateProducer';
import UpdateProducer from '../pages/admin/Producer/UpdateProducer';
import AdminProduct from '../pages/admin/Products/AdminProduct';
import CreateProduct from '../pages/admin/Products/CreateProduct';
import UpdateProduct from '../pages/admin/Products/UpdateProduct';
import AdminStatistical from '../pages/admin/Statistical/AdminStatistical';
import AdminCustomer from '../pages/admin/Users/AdminCustomer';
import Category from '../pages/clients/Category/Category';
import HomePage from '../pages/clients/Home/Home';
import User from '../pages/clients/User/DashboardUser';
import CustomizedSteppers from '../pages/clients/User/Stepper';
import UserInfo from '../pages/clients/User/UserInfo';
import UserAdress from '../pages/clients/User/Useradress';
import UserCartDetail from '../pages/clients/User/UsercardDetail';
import UserMyCart from '../pages/clients/User/Usermycart';
import Auth from '../pages/clients/auth/Auth';
import { Cart } from '../pages/clients/cart/Cart';
import { Details } from '../pages/clients/details/Details';
import Sales from '../pages/clients/sales/Sales';

import AddProductInventory from '../pages/admin/ProductInventory/AddProductInventory';
import AdminProductInvetory from '../pages/admin/ProductInventory/AdminProductInventory';
import OrderUser from '../pages/admin/Users/OrderUser';
import VoucherUser from '../pages/clients/User/UserVoucher';
import ForgotPasswordPage from '../pages/clients/auth/components/forgotPassword';
import Checkout from '../pages/clients/cart/checkout/Checkout';
import PaymentError from '../pages/clients/cart/payment/PaymentError';
import PaymentSuccess from '../pages/clients/cart/payment/PaymentSuccess';
import Invoice from '../pages/clients/invoice/invoice';
import Error from '../pages/clients/notFound/notFound';
import SearchOrder from '../pages/clients/searchOrder/searchOrder';
import News from '../pages/clients/News/News';
import NewsDetail from '../pages/clients/News/NewsDetail/NewsDetail';
import AdminProductInventory from '../pages/admin/ProductInventory/AdminProductInventory';
import CreateNews from '../pages/admin/News/CreateNews';
import AdminNews from '../pages/admin/News/AdminNews';
import UpdateNews from '../pages/admin/News/UpdateNews';
import SocketChat from '../pages/clients/SocketChat/SocketChat';

const PublicRouter = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/auth',
        component: Auth,
    },
    {
        path: '/cart',
        component: Cart,
    },
    {
        path: '/checkout',
        component: Checkout,
        isRequired: true,
    },
    {
        path: '/chat',
        component: SocketChat,
    },

    {
        path: '/checkout/paymentSuccess/:id',
        component: PaymentSuccess,
    },
    {
        path: '/checkout/paymentError',
        component: PaymentError,
    },
    {
        path: '/products/:id',
        component: Details,
    },
    {
        path: '/category',
        component: Category,
    },
    {
        path: '/auth/ChangePassword',
        component: ForgotPasswordPage,
    },
    { path: '/sales', component: Sales },
    {
        path: '/step',
        component: CustomizedSteppers,
    },
    {
        path: '/searchOrder',
        component: SearchOrder,
    },
    {
        path: '/searchOrder/:id',
        component: SearchOrder,
    },
    {
        path: '/news',
        component: News,
    },
    {
        path: '/news/detail/:slug',
        component: NewsDetail,
    },
];
const PrivateRouter = [
    {
        path: '/admin/product',
        component: AdminProduct,
    },
    {
        path: '/admin/createProduct',
        component: CreateProduct,
    },
    {
        path: '/admin/product/:id',
        component: UpdateProduct,
    },
    {
        path: '/admin/productInventory',
        component: AdminProductInventory,
    },
    {
        path: '/admin/productInventory/:id',
        component: AddProductInventory,
    },
    {
        path: '/admin/category',
        component: CategoryAdmin,
    },
    {
        path: '/admin/createCategory',
        component: CreateCategory,
    },
    {
        path: '/admin/createNews',
        component: CreateNews,
    },
    {
        path: '/admin/news',
        component: AdminNews,
    },

    {
        path: '/admin/news/:id',
        component: UpdateNews,
    },
    {
        path: '/admin/category/:id',
        component: UpdateCategory,
    },
    {
        path: '/admin/producer',
        component: ProducerAdmin,
    },
    {
        path: '/admin/createProducer',
        component: CreateProducer,
    },

    {
        path: '/admin/producer/:id',
        component: UpdateProducer,
    },
    {
        path: '/admin/discount',
        component: AdminDiscount,
    },
    {
        path: '/admin/createDiscount',
        component: CreateDiscount,
    },
    {
        path: '/admin/discount/:id',
        component: UpdateDiscount,
    },

    {
        path: '/admin/orders',
        component: AdminCarts,
    },

    {
        path: '/admin/orders/detail/:id',
        component: DetailCarts,
    },
    {
        path: '/admin/customer',
        component: AdminCustomer,
    },
    {
        path: '/admin/customer/:id',
        component: OrderUser,
    },
    {
        path: '/admin/statistical',
        component: AdminStatistical,
    },
];

const userProvide = [
    {
        path: '/user',
        component: User,
    },
    {
        path: '/user/info',
        component: UserInfo,
    },
    {
        path: '/user/adress',
        component: UserAdress,
    },
    {
        path: '/user/myvoucher',
        component: VoucherUser,
    },
    {
        path: '/user/mycart',
        component: UserMyCart,
    },
    {
        path: '/auth/ChangePassword',
        component: ForgotPasswordPage,
    },
    {
        path: '/user/mycart/:id',
        component: UserCartDetail,
    },
    {
        path: '/user/invoice/:id',
        component: Invoice,
        isRequired: true,
    },
];

const moreNotFound = [
    {
        path: '*',
        component: Error,
    },
];

export { PrivateRouter, PublicRouter, moreNotFound, userProvide };
