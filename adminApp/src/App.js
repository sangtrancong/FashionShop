
import React, { Suspense } from 'react'

import { BrowserRouter, Route, Routes } from "react-router-dom";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layouts/DefaultLayout'))

// Pages
const LoginPage = React.lazy(() => import('./pages/LoginPage'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<LoginPage />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App;
