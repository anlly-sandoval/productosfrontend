import { FaCreditCard, FaMoneyBillWave, FaExchangeAlt, FaStore } from 'react-icons/fa';

function PaymenMethodIcon({method}) {
    //objeto de mapeo para los iconos y colores
    const PaymenMethods = {
        card: {
            icon: FaCreditCard,
            color: 'text-indigo-500',
            label: 'Tarjeta'
        },
        cash: {
            icon: FaMoneyBillWave,
            color: 'text-green-500',
            label: 'Efectivo'
        },
        transfer: {
            icon: FaExchangeAlt,
            color: 'text-blue-500',
            label: 'Transferencia'
        },
        pickup: {
            icon: FaStore,
            color: 'text-yellow-500',
            label: 'Recoger en tienda'
        },
    };
    const config = PaymenMethods[method];
    const IconComponent = config.icon;

    return (
        <span className='inline-flex items-center'>
            <IconComponent size={20} className={`${config.color} mr-1`} />
            <span>{config.label}</span>
        </span>
    );
}

export default PaymenMethodIcon;