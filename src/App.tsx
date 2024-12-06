import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import PATH from './constants/path'
import { lazy, Suspense } from 'react'
import { LoadingPage } from './components'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

function App() {
  const isAuthenticated = false
  const ProtectedRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to={PATH.LOGIN} />
  }
  const RejectedRoute = () => {
    return !isAuthenticated ? <Outlet /> : <Navigate to={PATH.HOME} />
  }

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            path={PATH.HOME}
            element={
              <Suspense fallback={<LoadingPage />}>
                <Home />
              </Suspense>
            }
          />
        </Route>
        <Route element={<RejectedRoute />}>
          <Route
            path={PATH.LOGIN}
            element={
              <Suspense fallback={<LoadingPage />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path={PATH.REGISTER}
            element={
              <Suspense fallback={<LoadingPage />}>
                <Register />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
