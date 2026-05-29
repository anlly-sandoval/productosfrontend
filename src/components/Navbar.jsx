import NavbarAdmin from "./NavbarAdmin";
import NavbarUser from "./NavbarUser";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";
import { IoPersonAdd, IoLogIn } from "react-icons/io5";
import Tooltip from '@mui/material/Tooltip';

function Navbar(){
    const { isAuthenticated, isAdmin } = useAuth();
    if(isAuthenticated && isAdmin)
        return <NavbarAdmin/>
    else if (isAuthenticated)
        return <NavbarUser/>
    //barra de navegacion publica sin iniciar sesion    
    return (
        <nav className="bg-zinc-700 my-3 flex justify-between items-start py-5 px-10 rounded-lg">
            <Link to='/'>
            <h1 className="text-2xl font-bold">Productos</h1>
            </Link>
            <ul className="flex gap-x-2">
                <li>
                    <Tooltip title="Iniciar sesion">
                    <Link to='/login' className="bg-zinc-500 rounded-sm">
                    <IoLogIn size={30}/>
                    </Link>
                    </Tooltip>
                </li>
                <li>    
                    <Tooltip title="Registrarse">
                    <Link to='/register' className="bg-zinc-500 rounded-sm">
                    <IoPersonAdd size={30}/>
                    </Link>
                    </Tooltip>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;