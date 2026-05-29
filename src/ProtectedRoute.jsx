import { Navigate, Outlet } from "react-router";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();
    console.log("IsLoading: ", isLoading);
    console.log("isAuthenticated: ", isAuthenticated);

    //si se estan cargando los datos de app se retorna el texto
    if(isLoading)
      return <h1>Cargando...</h1>
    if(!isAuthenticated && !isLoading)
        return <Navigate to="/login" replace/>

  return (
    <Outlet />
  )
}

export default ProtectedRoute;