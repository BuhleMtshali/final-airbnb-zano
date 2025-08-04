import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import Login  from './pages/Login'
import Register from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { CreateListing } from './pages/CreateListing'
import { ViewListings } from './pages/ViewListings'
import { UpdateListing } from './pages/UpdatedListing'
import { LocationPage } from './pages/LocationPage'
import { LocationDetails } from './pages/LocationDetails'
import { Reservations } from './pages/Reservations'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
              <Route path="/location/:location" element={<LocationPage />} />
              <Route path="/listings/:id" element={<LocationDetails />} />
              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-listing"
                element={
                  <ProtectedRoute>
                    <CreateListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-listings"
                element={
                  <ProtectedRoute>
                    <ViewListings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update-listing/:id"
                element={
                  <ProtectedRoute>
                    <UpdateListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reservations"
                element={
                  <ProtectedRoute>
                    <Reservations />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App;