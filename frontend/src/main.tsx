import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from './App.tsx'
import {store} from './store/store.ts'
import {Provider} from 'react-redux'
import Login from './pages/Login.tsx';
import HotelSearch from './pages/HotelSearch.tsx';
import Registration from './pages/Registration.tsx';
import YourBookings from './pages/YourBookings.tsx';
import LandingPage from './pages/LandingPage.tsx';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'element={<App/>}>
      <Route path='' element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Registration/>}/>
      <Route path='/hotel-search' element={<HotelSearch/>}/>
      <Route path='/your-bookings' element={<YourBookings/>}/>
    </Route>

  ))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes}/>
        
    </Provider>
  </StrictMode>,
)
