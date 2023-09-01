import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import HomePage from "./pages/clients/Home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Auth from "./pages/clients/auth/Auth";
function App() {
  return (
    <div className="h">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <DefaultLayout>
                <HomePage />
              </DefaultLayout>
            }
          ></Route>
          <Route
            path="/auth"
            element={
              <DefaultLayout>
                <Auth />
              </DefaultLayout>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
