import { IoCartOutline, IoTrashBinOutline, IoBagCheckOutline } from "react-icons/io5";
import { useProducts } from "../context/ProductContext";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Cart( ) {

    const { cart, incProduct, decProduct, removeProduct, getTotalProducts, calculateSubTotal, calculateIva, calculateTotal, updateStepOrder } = useProducts();

    const navigate = useNavigate();

    const handleProcess = () =>{
        updateStepOrder(1);
        navigate('/sale');
    }

    //funcion para incrementar la cantidad de productos del carrito
    const incrementProduct = (product) => {

        const existingProduct = cart.find((cartItem)=> cartItem._id === product._id);

        if(existingProduct.toSell >= existingProduct.quantity){
            //ya q existe el producto en el carrito, validamos que no se exceda el maximo de stock
            toast.warn('Ha alcanzado el maximo de ' + existingProduct.quantity + ' productos en stock');
            return ;
        } else {
            incProduct(product._id);
            toast.success("Producto agregado al carrito");
        } //fin else
    } //fin de incrementProduct


    //funcion para decrementar la cantidad de productos del carrito
    const decrementProduct = (product) => {
        const existingProduct = cart.find((cartItem)=> cartItem._id === product._id);

        if(existingProduct.toSell > 1){
            //ya q existe el producto en el carrito, validamos que se pueda decrementar
            decProduct(product._id);
        } else {
            removeProduct(product._id);
        } //fin else
        toast.warn("Producto eliminado del carrito");
    } //fin de decrementProduct

    return (
        <div className="top-0 left-0 w-full h-full bg-white/10 flex justify-center items-center m-3 p-3">
            <div className="w-2/5 bg-white shadow-lg py-2 rounded-md">
                <h2 className="flex justify-between items-center text-sm font-bold text-gray-950 border-b border-gray-300 py-3 px-4 mb-4">
                    Carrito de compras <IoCartOutline size={30}/>
                </h2>
                <div className="flex flex-col px-4 pb-4">
                    {
                        cart.length > 0 ? (
                            <table>
                                <thead>
                                    <tr className="text-gray-700 text-xs font-bold py-1 px-1 text-left">
                                        <th>Cant.</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th className="text-right">Total</th>
                                        <th className="text-right">Opc.</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-950 text-xs font-semibold py-1 px-1 text-left">
                                    {
                                        cart.map((product)=>(
                                            <tr 
                                                key={product._id}
                                                className="hover:bg-gray-100"
                                            >
                                                <td>
                                                    <span
                                                        className="m-1 p-1 text-sm font-bold text-red-500 cursor-pointer"
                                                        onClick={()=> decrementProduct(product)}
                                                    >
                                                        -
                                                    </span>
                                                    {product.toSell}
                                                    <span
                                                        className="m-1 p-1 text-sm font-bold text-green-500 cursor-pointer"
                                                        onClick={()=> incrementProduct(product)}
                                                    >
                                                        +
                                                    </span>
                                                </td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td className="text-right">
                                                    {(product.toSell * product.price).toFixed(2)}
                                                </td>
                                                <td className="text-right">
                                                    <div className="flex items-center justify-end">
                                                        <button
                                                            className="m-1 p-1 text-sm font-bold text-yellow-500 text-right"
                                                            onClick={()=>{
                                                                removeProduct(product._id)
                                                                toast.warn("Producto eliminado del carrito")
                                                            }}
                                                        >
                                                            <IoTrashBinOutline size={15}/>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <div>
                                <p className="text-center text-green-700">
                                    El carrito esta vacio
                                </p>
                            </div>
                        )
                    }
                </div>
                <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-900">
                        Total de productos
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium text-gray-900">
                        {getTotalProducts}
                    </div>
                </div>
                <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-900">Subtotal</div>
                    <div className="flex justify-between items-center text-sm font-medium text-gray-900">
                        ${calculateSubTotal.toFixed(2)}
                    </div>
                </div>
                <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-900">IVA (16%)</div>
                    <div className="flex justify-between items-center text-sm font-medium text-gray-900">
                        ${calculateIva(calculateSubTotal.toFixed(2))}
                    </div>
                </div>
                <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-900">Total</div>
                    <div className="flex justify-between items-center text-sm font-medium text-gray-900">
                        ${calculateTotal.toFixed(2)}
                    </div>
                </div>
                <div className="border-t border-gray-300 flex justify-end items-end px-4 pt-2">
                    <Tooltip content="Procesar">
                        <button
                            type="button"
                            className={`flex justify-between items-center text-white px-4 py-2 rounded-lg text-sm
                                ${getTotalProducts === 0 ? "pointer-events-none bg-green-100 hover:bg-green-200"
                                : "bg-green-500 hover:bg-green-600"
                                }`}
                                onClick={()=> handleProcess()}
                        >
                            Procesar <IoBagCheckOutline className="ml-2" size={30} />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default Cart;