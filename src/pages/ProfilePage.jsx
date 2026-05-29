import { useAuth } from '../context/AuthContext';
import { IoPersonOutline, IoMailOutline, IoShieldOutline } from 'react-icons/io5';

function ProfilePage() {
    const { user, isAdmin } = useAuth();

    const initials = user.username
        ? user.username.slice(0, 2).toUpperCase()
        : '??';

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <h2 className="text-xl font-semibold p-4 text-blue-700 border-b border-gray-200">
                    Mi perfil
                </h2>
                <div className="flex items-center gap-4 p-6 border-b border-gray-200">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-lg flex-shrink-0">
                        {initials}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{user.username}</p>
                        <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-md font-medium
                            ${isAdmin
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                            {isAdmin ? 'Administrador' : 'Usuario'}
                        </span>
                    </div>
                </div>

                {/* Campos */}
                <div className="flex flex-col divide-y divide-gray-100">
                    <div className="flex items-center gap-3 px-6 py-4">
                        <IoPersonOutline size={20} className="text-blue-400 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Nombre</p>
                            <p className="text-sm text-gray-900">{user.username}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-4">
                        <IoMailOutline size={20} className="text-green-400 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Correo electrónico</p>
                            <p className="text-sm text-gray-900">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-4">
                        <IoShieldOutline size={20} className="text-purple-400 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Rol</p>
                            <p className="text-sm text-gray-900">
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