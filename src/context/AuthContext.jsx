//valdiar los usuarios que iniciaron sesion
import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

//useAuth es el nombre global para poder usar este contexto de autorizacion
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe estar definida en un contexto");
  return context;
}; //fin de useAuth

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isAdmin, setIsAdmin ] = useState(false);

  const ROLE_ADMIN = import.meta.env.VITE_ROLE_ADMIN;

  //funcion de registro de usuarios
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      //console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
      setIsLoading(false);
      setIsAdmin(false);
    } catch (error) {
      //console.log(error);
      //si hay error en el regustro asignamos el error a la variable errors
      setErrors(error.response.data.message);
    }
  }; //fin de signup

  //funcion de incio de sesion
  const signin = async (user)=>{
    try {
      const res = await loginRequest(user);
      //validar si el usuario es admin
      if(res.data.role === ROLE_ADMIN)
        setIsAdmin(true);

      setUser(res.data);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      setErrors(error.response.data.message)
    }
  };//fin de sigin

  useEffect(()=>{
    if(errors.length > 0){

    }
  })


  //useEffect para verificar la sesion del usuario
  useEffect(()=>{
    async function checkLogin() {
      const cookies = Cookies.get();
      if(!cookies.token){
        //si no hay una cookie llamda token
        setIsAuthenticated(false);
        setIsLoading(false); //no hay cookie no caragn los datos
        //establecemos los datos a nulo
        setUser(null);
        setIsAdmin(false);
        return
      }//fin del if !cookies.token
      try { //en caso de que exista un toke, lo verificamos
      const res = await verifyTokenRequest(cookies.token);
      if(!res.data){ //si el servidor no respode con un token
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        setIsAdmin(false);
        return;
      }// fin del if !res.data
      //en caso de que sie xista un token y se obtenga datos de respuesta, el token es correcto
      setIsAuthenticated(true);
      setUser(res.data);
      setIsLoading(false); //termino de cargar los datos de user
      if(res.data.role === ROLE_ADMIN)
        setIsAdmin(true);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
    }
    };// fin de checklogin
    checkLogin();
  }, [ ]); //fin de useeffect para verificar la sesion

  //funcion para cerrar sesion
  const logout = ()=>{
    logoutRequest();
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
    setIsLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        logout,
        signup,
        signin,
        user,
        isAuthenticated,
        errors,
        isLoading,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};