import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import CategoryAdmin from "../pages/admin/Category/AdminCategory";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import AdminProduct from "../pages/admin/Products/AdminProduct";
import CreateProduct from "../pages/admin/Products/CreateProduct";
import UpdateProduct from "../pages/admin/Products/UpdateProduct";
import FileUploadForm from "../pages/admin/Products/UploadFile";
import Category from "../pages/clients/Category/Category";
import HomePage from "../pages/clients/Home/Home";
import Auth from "../pages/clients/auth/Auth";
import ChangePassword from "../pages/clients/auth/changePassword";
import { Cart } from "../pages/clients/cart/Cart";
import { Details } from "../pages/clients/details/Details";

const PublicRouter = [
     {
         path:"/", component : HomePage
     },
     {
       path:"/auth", component: Auth
     },
      {
       path:"/changePass", component:ChangePassword  
      },
      {
         path:"/cart", component: Cart
      },
      {
        path:"/products/:id", component: Details
     },
     {
        path:"/category", component: Category
     }
      
]
 const PrivateRouter = [
    {
      path:"/admin/product", component: AdminProduct
    } ,
      {
         path:"/admin/createProduct", component: CreateProduct
       } ,
       {
        path:"/admin/product/:id", component: UpdateProduct
      } ,
      {
        path:"/admin/category", component: CategoryAdmin
      } ,
       
 ]
 
 export {PublicRouter , PrivateRouter}