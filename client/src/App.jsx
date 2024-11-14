import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './Routes/ProtectedRoute';
import PublicRoute from './Routes/PublicRoute';
import CreateCarPage from './pages/CreateCarPage';
import MyCarsPage from './pages/MyCarsPage';
import CarDetailsPage from './pages/CarDetailsPage';
import EditCarPage from './pages/EditCarPage';

function App() {

  return ( 
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/create-car" element={
            <ProtectedRoute>
              <CreateCarPage />
            </ProtectedRoute>
          } />
          <Route path="/my-cars" element={
            <ProtectedRoute>
              <MyCarsPage />
            </ProtectedRoute>
          } />
          <Route path="/my-cars/edit/:id" element={
            <ProtectedRoute>
              <EditCarPage />
            </ProtectedRoute>
          } />
          <Route path="/my-cars/:id" element={
            <ProtectedRoute>
              <CarDetailsPage />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;