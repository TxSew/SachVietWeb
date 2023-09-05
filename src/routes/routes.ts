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
        path:"/details", component: Details
     },
     {
        path:"/category", component: Category
     }
      
]
 
 export {PublicRouter}