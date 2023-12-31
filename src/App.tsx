import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import HeaderOnly from './layouts/HeaderOnly/HeaderOnly';
import { PrivateRouter, PublicRouter, moreNotFound, userProvide } from './routes';
import { useEffect, useState } from 'react';
import { httpAccount } from './submodules/controllers/http/axiosController';
import LoginAdminLayout from './layouts/LoginAdminLayout/LoginAdminLayout';

function isAdminAuthenticated() {
    const token = localStorage.getItem('role');
    if (token) {
        return true;
    }
    return false;
}
function isUserAuthenticated() {
    const token = localStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
}
function App() {
    const [user, setUser] = useState<any>({});
    useEffect(() => {
        httpAccount
            .getMe()
            .then((response) => {
                if (response) {
                    setUser(response);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="App">
            <Router>
                <Routes>
                    {PublicRouter.map((e, i) => {
                        const Component: any = e.component;
                        let Layout = DefaultLayout;
                        if (e.isRequired) {
                            Layout = HeaderOnly;
                        }
                        if (e.isAdmin) {
                            Layout = LoginAdminLayout;
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
                        if (isAdminAuthenticated()) {
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
                    {userProvide.map((e, i) => {
                        if (isUserAuthenticated()) {
                            let Layout = DefaultLayout;
                            const UserComponent: any = e.component;
                            return (
                                <Route
                                    key={i}
                                    path={e.path}
                                    element={
                                        <Layout>
                                            <UserComponent />
                                        </Layout>
                                    }
                                />
                            );
                        } else {
                            return;
                        }
                    })}
                    {moreNotFound?.map((e, i) => {
                        const Component = e.component;
                        return <Route key={i} path={e.path} element={<Component />} />;
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
