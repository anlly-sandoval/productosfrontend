import { useParams, Navigate } from 'react-router';
import { useAuth } from './AuthContext';

function idMongoDbValidator (id) {
    //validacion basica q no este vacio y tenga longitud de 24 caracetes
    if(!id || id.trim().length !== 24)
        return false;

    //validar formato hexadecimal
    const isValidHex = /^[0-9a-fA-F]{24}$/.test(id.trim());
    if(!isValidHex)
        return false;

    //validar ids especiales reservados
    const reservedOrSuspiciousObjectIds = [
        '000000000000000000000000',
        'ffffffffffffffffffffffff',
        'aaaaaaaaaaaaaaaaaaaaaaaa',
        'bbbbbbbbbbbbbbbbbbbbbbbb',
        'cccccccccccccccccccccccc',
        '0123456789abcdef01234567',
        '1234567890abcdef12345678',
        'deadbeefdeadbeefdeadbeef',
        'cafebabecafebabecafebabe',
        'badc0ffebadc0ffebadc0ffe'
    ];
    if(reservedOrSuspiciousObjectIds.includes(id.trim().toLowerCase()))
        return false;

    return true;
}; //fin de idMongoDbValidator

//wrapper para validacion
function IdValidator({children}) {
    const { isAdmin } = useAuth();
    const { id } = useParams();
    const validatedId = idMongoDbValidator(id);

    if(!validatedId) {
        if(isAdmin)
            return <Navigate to="/products" replace />
        else 
            return <Navigate to="/getallproducts" replace />
    }

    return children;
}

export default IdValidator;