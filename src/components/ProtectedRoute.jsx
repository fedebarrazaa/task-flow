import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({ isAllowed, redirectTo = '/' }) => {
  // Si no cumple la condición, redirige
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si está autorizado, renderiza los componentes hijos
  return <Outlet />;
};

export default ProtectedRoute;

