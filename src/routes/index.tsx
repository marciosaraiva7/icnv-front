import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Importe seus componentes de página aqui
import HomePage from "../pages/homepage";
import CreateAccount from "../pages/create-account";
import ResetPassword from "../pages/reset-password";
import LoginPage from "../pages/login";
import NotFoundPage from "../pages/not-found";
// Substitua isso pela sua lógica de autenticação real
const isAuthenticated = () => {
  const isLogged = localStorage.getItem("token");
  if (isLogged) {
    return true;
  }
  return false;
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    // Redireciona para a página de login se não estiver autenticado
    return <Navigate to="/login" />;
  }
  return children;
};

const RoutesConfig = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default RoutesConfig;
