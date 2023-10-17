import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate
} from "react-router-dom";
import "./index.css";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import HeaderOnly from "./layouts/HeaderOnly/HeaderOnly";
import { PrivateRouter, PublicRouter } from "./routes";

function isUserAuthenticated() {
  // Replace this with your actual logic to check if the user is authenticated and the token is valid
  const token = localStorage.getItem("token"); // Retrieve the JWT token from storage
  if (token) {
    // Verify the token's validity using your JWT library
    return true;
  }
  return false;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {PublicRouter.map((e, i) => {
            const Component = e.component;
            let Layout = DefaultLayout;
            if (e.isRequired) {
              Layout = HeaderOnly;
            }
            return (
              <Route
                key={i}
                path={e.path}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              />
            );
          })}

          {PrivateRouter?.map((e, i) => {
            if (isUserAuthenticated()) {
              const AdminComponent: any = e.component;
              let Layout = AdminLayout;
              return (
                <Route
                  key={i}
                  path={e.path}
                  element={
                    <Layout>
                      <AdminComponent />
                    </Layout>
                  }
                />
              );
            } else {
              return;
            }
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
