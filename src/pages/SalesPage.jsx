import CartResume from "../components/CartResume";
import AddAddress from "../components/AddAddress";
import { useProducts } from "../context/ProductContext";
import AddPayment from "../components/AddPayment";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useOrders } from '../context/OrderContext';

function SalesPage() {
    const navigate = useNavigate();
    const { 
        address, payment, cart, updateStepOrder,
        initOrder, stepOrder, clearCart, 
        getTotalProducts, calculateSubTotal, calculateIva, calculateTotal
    } = useProducts();
    const { createOrder } = useOrders();
    const isProcessing = useRef(false);

    const steps = [
        "Confirmar pedido",
        "Agregar direccion",
        "Informacion de pago",
        "Finalizar"
    ];

    //useEffect que se ejcuta una sola vez al inicializar el componente
    useEffect(()=> {
        if(stepOrder === 0)
            navigate('getallproducts');
        initOrder();
    }, []); //fin de useEffect

    useEffect(() => {
        if(stepOrder === 4){
            finalizingSale();
        }
    }, [stepOrder]);

    const finalizingSale = () => {
        if(isProcessing.current) {
            return;
        }
        isProcessing.current = true;

        //crear el pedido
        let paymentData = {};
        if(payment.paymentMethod === "card") {
            paymentData = {
                method: payment.paymentMethod,
                cardDetails: payment.cardDetails,
                shippingAddress: address
            }
        } else {
            paymentData = {
                method: payment.paymentMethod,
                userName: payment.userName
            }
        }    
        const orderData = {
            items: cart.map(item => ({
                productId: item._id,
                quantity: item.toSell.toFixed(0),
                price: item.price.toFixed(2)
            })),
            paymentMethod: paymentData,
            totalProducts: getTotalProducts.toFixed(0),
            subTotal: calculateSubTotal.toFixed(2),
            total: calculateTotal.toFixed(2),
            iva: calculateIva(calculateSubTotal).toFixed(2),
            status: 'received',
        };
        //creamos la orden mandando los datos al api
        createOrder(orderData);
        //reiniciamos el proceso del pedido al paso 0
        updateStepOrder(0);
        //vaciamos el carrito
        clearCart();
        //reset despues de 1sg
        setTimeout(()=> {
            isProcessing.current = false;
        }, 1000);
        //navegamos hacia el listado de productos
        navigate('/getallproducts')
    }; //fin de finalizingSale

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
        {/*Stepper */}
        <div className="flex items-center justify-between mb-8">
            {
                steps.map((setp,index)=>(
                    <div key={index} className="flex-1">
                        <div className="relative flex items-center justify-center">
                            <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white
                                ${
                                    stepOrder >= index + 1 ? "bg-blue-500" : "bg-gray-300"
                                }`}
                            >
                                {index + 1}
                            </div>
                            {
                                index < steps.length -1 && (
                                    <div className={`absolute w-full h-1
                                        ${
                                            stepOrder > index + 1 ? "bg-blue-500" : "bg-gray-300"
                                        }`}
                                        style={{ left: "10%", transform: "translateX(50%)"}}
                                    ></div>    
                                )
                            }    
                        </div>    
                    </div>    
                ))
            }
        </div>
        {/*Step Content */}
        <div className="mb-4">
            {stepOrder === 1 && <CartResume/>}
            {stepOrder === 2 && <AddPayment/>}
            {stepOrder === 3 && <AddAddress/>}
        </div>
    </div>
  )
}

export default SalesPage