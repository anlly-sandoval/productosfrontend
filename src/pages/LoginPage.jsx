import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/loginSchema";
import {
  IoPersonAdd,
  IoLogIn,
  IoEyeSharp,
  IoEyeOffSharp,
} from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import ReCaptcha from 'react-google-recaptcha';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, isAuthenticated, errors: loginErrors, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [ captchaValue, setCaptchaValue ] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() => {
    if (isAuthenticated === false) return;
    
    if(isAuthenticated && isAdmin)
      navigate('/products');
    else
      navigate('/getallproducts')
  }, [isAuthenticated, isAdmin]); //Fin de useEffect

  useEffect(() => {
    const timer = setTimeout(() => {
      setPasswordShown(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [passwordShown]); //Fin de useEffect

  const onSubmit = handleSubmit(async (values) => {
    //console.log(values);
    signin(values);
  }); //Fin de onSubmit

  return (
    <div className="flex items-center justify-center h-screen" aria-hidden="false">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <h1 className="text-3xl font-bold mb-5 flex">
          Inicio de Sesión <IoLogIn size={30} className="mx-1" />
        </h1>
        {loginErrors.map((error, i) => (
          <div className="bg-red-500 p-2 my-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              style={{ border: errors.email ? "2px solid red" : "" }}
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-2">
            <label>Password</label>
            <div className="flex justify-end items-center relative">
              <input
                type={passwordShown ? "text" : "password"}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                style={{ border: errors.password ? "2px solid red" : "" }}
                placeholder="Password"
                {...register("password")}
              />
              {passwordShown ? (
                <IoEyeSharp
                  size={30}
                  className="absolute mr-2 w-10"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IoEyeOffSharp
                  size={30}
                  className="absolute mr-2 w-10"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <Tooltip title="Iniciar Sesion">
          <span>
          <button
            type="submit"
            disabled={!captchaValue}
            className="bg-transparent hover:bg-zinc-500 text-zinc-500 hover:text-white font-semibold
                                    py-2 px-4 border-zinc-100 border hover:border-transparent rounded mb-2"
          >
            <IoLogIn size={30} className="mx-1" />
          </button>
          </span>
          </Tooltip>
          <ReCaptcha
            sitekey="6LcJaAItAAAAACrNIKK5DAsQMCM1oATR5tnLUaxp"
            onChange={(value)=>setCaptchaValue(value)}
            aria-hidden="false"
          />  
        </form>
        <div className="flex gap-x-2 justify-between pt-5 mt-5">
          ¿No tienes una cuenta?
          <Link to="/register" className="text-sky-500">
            <div className="flex mx-2 px-2 items-start">
              ¡Regístrate!
              <IoPersonAdd size={30} className="mx-1" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;