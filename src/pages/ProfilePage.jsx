import { useAuth } from '../context/AuthContext';
import { IoPersonOutline, IoMailOutline, IoShieldOutline } from 'react-icons/io5';

function ProfilePage() {
    const { user, isAdmin } = useAuth();

    const initials = user.username
        ? user.username.slice(0, 2).toUpperCase()
        : '??';

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-sm">

                {/* Avatar centrado arriba */}
                <div className="flex flex-col items-center mb-6">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-semibold mb-3
                        ${isAdmin ? 'bg-purple-200 text-purple-700' : 'bg-blue-200 text-blue-700'}`}>
                        {initials}
                    </div>
                    <h1 className="text-xl font-semibold text-gray-800">{user.username}</h1>
                    <span className={`mt-2 text-xs px-3 py-1 rounded-full font-medium
                        ${isAdmin
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                        {isAdmin ? 'Administrador' : 'Usuario'}
                    </span>
                </div>

                {/* Tarjetas de datos */}
                <div className="flex flex-col gap-3">
                    <div className="bg-white rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm">
                        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <IoPersonOutline size={18} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Nombre</p>
                            <p className="text-sm font-medium text-gray-800">{user.username}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm">
                        <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                            <IoMailOutline size={18} className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Correo electrónico</p>
                            <p className="text-sm font-medium text-gray-800">{user.email}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm">
                        <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                            <IoShieldOutline size={18} className="text-purple-500" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Rol</p>
                            <p className="text-sm font-medium text-gray-800">
                                {isAdmin ? 'Administrador' : 'Usuario'}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProfilePage;