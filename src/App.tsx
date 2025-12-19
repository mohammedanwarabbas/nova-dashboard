import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import NotFoundPage from './pages/error/NotFoundPage';
import UnauthorizedPage from './pages/auth/UnauthorizedPage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { ROUTES } from './utils/constants';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} replace />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;