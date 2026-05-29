import axios from './axiosInstance';

//request para registar usuario en el backend
//primer user, datos del formulario
//post es el metodo a ejecutar mediante ajax
// /register <- ruta que se suma a http://localhost:4001/api/register
//el segundo user es el que se envia a backend y se convierte en req.body
export const registerRequest = user => axios.post('/register', user);

//request para inciiar sesion
export const loginRequest = user => axios.post('/login', user);

//request para verificar el token de inicio de sesion
export const verifyTokenRequest = ()=> axios.get('/verify');

//request para cerrar la sesion del usuario
export const logoutRequest = ()=> axios.post('/logout');