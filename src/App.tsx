import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { PrivateRouter, PublicRouter } from "./routes";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {PublicRouter.map((e, i) => {
            const Component = e.component;
            let Layout = DefaultLayout
            return (
              <Route
                path={e.path}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              />
            );
          })}
           {/* Private */}
            {/* admin */}
             {
               PrivateRouter.map((e, i) => {
                 const AdminComponent = e.component
                  let Layout = AdminLayout
                  return (
                     <Route 
                     path={e.path} 
                     element={
                       <Layout>
                        <AdminComponent/>
                       </Layout>
                     }
                     /> 
                  )
               })
             }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
