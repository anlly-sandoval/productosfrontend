import OrderStatus from "./OrderStatus";
import SelectOrderStatus from "./SelectOrderStatus";
import { useAuth } from '../context/AuthContext';
import { toast } from "react-toastify";

function OrderInfo({id, quantity, subtotal, iva, total, status, orderDate}) {
    
    const { isAdmin } = useAuth();

    //funcion para formatear la fecha de manera amigable
    const formDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    const handleStatusChange = (newStatus) => {
        if(status === 'delivered' && newStatus === 'cancelled') {
            toast.error("No se puede actualizar el estado de una orden entregada");
            return;
        }
        updateStatusOrder(id, {status:newStatus})
    }; //fin de handleStatusChnage

    return (
        <div className="space-y-4 p-4 bg-white shadow-lg py-2 rounded-md text-gray-950 text-shadow-2xs text-xs">
            <div className="flex justify-between">
                <span className="font-semibold">ID del Pedido:</span>
                <span>{id}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold">Estatus del pedido</span>
                {
                    isAdmin ? (
                        <SelectOrderStatus status={status} onChange={handleStatusChange} />
                    ) : <OrderStatus status={status} showLabel={true} />
                }
            </div>
            <div className="flex justify-between">
                <span className="font-semibold">Cantidad de productos:</span>
                <span>{quantity}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold">Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold">IVA:</span>
                <span>${iva.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold">Fecha del pedido:</span>
                <span>{formDate(orderDate)}</span>
            </div>
        </div>
    )
}

export default OrderInfo;