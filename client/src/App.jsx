import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import IndexPage from './pages/IndexPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import DashboardPage from './pages/DashboardPage'
import { UserContextProvider } from './UserContext'
import Layout from './Layout'
import TrailsPage from './pages/TrailsPage'
import CategoryPage from './pages/CategoryPage'
import UsersPage from './pages/UsersPage'
import BookingsPage from './pages/BookingsPage'
import ToursAndPackages from './pages/ToursAndPackages'
import TravelAgencyAccounts from './pages/TravelAgencyAccounts'
import FeaturesPage from './pages/FeaturesPage'

// Set default axios settings
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  
  return (
    <UserContextProvider>
      <Routes>
        
            <Route index element={<IndexPage/>} />
            {/* <Route path="/login" element={<LoginPage/>} /> */}
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/features" element={<FeaturesPage/>} />
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path="/trails" element={<TrailsPage/>} />
            <Route path='/category' element={<CategoryPage/>} />
            <Route path='/users' element={<UsersPage/>} />
            <Route path='/bookings' element={<BookingsPage/>} />
            <Route path='/toursPackages' element={<ToursAndPackages/>} />
            <Route path='/travelAgencySignUp' element={<TravelAgencyAccounts/>} />


      </Routes>
    </UserContextProvider>
  )
}

export default App
