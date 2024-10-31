import { Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import IndexPage from './pages/IndexPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import DashboardPage from './pages/DashboardPage'
import { UserContextProvider, UserContext } from './UserContext'
import { useContext } from "react";
import Layout from './Layout'
import TrailsPage from './pages/TrailsPage'
import CategoryPage from './pages/CategoryPage'
import UsersPage from './pages/UsersPage'
import BookingsPage from './pages/BookingsPage'
import ToursAndPackages from './pages/ToursAndPackages'
import FeaturesPage from './pages/FeaturesPage'
import TravelAgencyCredentials from './pages/TravelAgencyCredentials'
import TravelAgencyAccounts from './pages/TravelAgencyAccounts'
import BookingSchedulesPage from './pages/BookingSchedulesPage'
import TransactionPage from './pages/TransactionPage'
import SettingsPage from './pages/SettingsPage'

// Set default axios settings
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

// A Higher-Order Component for protecting routes
function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/" />;
}

function App() {
  
  return (
    <UserContextProvider>
      <Routes>
        
            <Route index element={<IndexPage/>} />
            {/* <Route path="/login" element={<LoginPage/>} /> */}
            <Route path="/register" element={<RegisterPage/>} />
            
            <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage/>
                </ProtectedRoute> 
            }/> 
            <Route path="/trails" element={
                <ProtectedRoute>
                  <TrailsPage/>
                </ProtectedRoute> 
            }/> 
            <Route path="/category" element={
                <ProtectedRoute>
                  <CategoryPage/>
                </ProtectedRoute> 
            }/>
            <Route path="/features" element={
                <ProtectedRoute>
                  <FeaturesPage/>
                </ProtectedRoute> 
            }/> 
            <Route path="/users" element={
                <ProtectedRoute>
                  <UsersPage/>
                </ProtectedRoute> 
            }/>
            <Route path="/bookings" element={
                <ProtectedRoute>
                  <BookingsPage/>
                </ProtectedRoute>
            }/>
            <Route path="/toursPackages" element={
                <ProtectedRoute>
                  <ToursAndPackages/>
                </ProtectedRoute>
            }/>
            <Route path="/travelAgencySignUp" element={
                <ProtectedRoute>
                  <TravelAgencyCredentials/>
                </ProtectedRoute>
            }/>
            <Route path="/travelAgencyAccount" element={
                <ProtectedRoute>
                  <TravelAgencyAccounts/>
                </ProtectedRoute>
            }/>
            <Route path="/bookingSched" element={
                <ProtectedRoute>
                  <BookingSchedulesPage/>
                </ProtectedRoute>
            }/>
            <Route path="/transaction" element={
                <ProtectedRoute>
                  <TransactionPage/>
                </ProtectedRoute>
            }/>
            <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage/>
                </ProtectedRoute>
            }/>
      </Routes>
    </UserContextProvider>
  )
}

export default App
