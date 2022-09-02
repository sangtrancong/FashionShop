
import React, { Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

// routes config
import routes from '../routes';

import {
    HeaderContainer,
    MenuContainer,
    FooterContainer,
} from '../containers';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

function useAuth() {
    const userLogin = localStorage.getItem("userLogin");
    return userLogin || false;
}

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const DefaultLayout = () => {
    return (
        <div className="hold-transition sidebar-mini layout-fixed">
            <div className="wrapper">
                {/* Preloader */}
                {/* <div className="preloader flex-column justify-content-center align-items-center">
                    <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
                </div> */}

                <HeaderContainer />

                <MenuContainer />

                <Suspense fallback={loading}>
                    <Routes>
                        {routes.map((route, idx) => {
                            return (
                                route.element && (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        element={
                                            <PrivateRoute>
                                                <route.element />
                                            </PrivateRoute>
                                        }
                                    />
                                ))
                        })}
                        <Route path="/" element={<Navigate to="login" replace />} />
                    </Routes>
                </Suspense>

                <FooterContainer />
                <aside className="control-sidebar control-sidebar-dark"></aside>
            </div>
        </div>
    )
}

export default DefaultLayout;
