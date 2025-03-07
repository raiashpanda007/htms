import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
} from "react-router-dom";
import App from './App.tsx'
import { store } from './store/store.ts'
import { Provider, useSelector } from 'react-redux'
import type { RootState } from './store/store.ts'
import Login from './pages/Login.tsx';
import HotelSearch from './pages/HotelSearch.tsx';
import Registration from './pages/Registration.tsx';
import YourBookings from './pages/YourBookings.tsx';
import LandingPage from './pages/LandingPage.tsx';

// ProtectedRoute component checks if the user is logged in.
// If not, it redirects to /login; otherwise, it renders the child routes (Outlet).
const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.login);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<LandingPage />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Registration />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path='hotel-search' element={<HotelSearch />} />
        <Route path='your-bookings' element={<YourBookings />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>,
);
