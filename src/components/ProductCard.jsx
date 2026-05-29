import { useProducts } from "../context/ProductContext";
import { Link } from 'react-router';
import { IoTrashBinSharp, IoPencilSharp, IoBagAddSharp } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import { useAuth } from "../context/AuthContext";
import { toast } from 'react-toastify';

function ProductCard({product}) {
    const { deleteProduct, addToCart, incProduct, cart } = useProducts();
    const { isAdmin } = useAuth();

    //funcion para agregar un producto al carrito o incrementar la cantidad de productos
    const addingProduct = (product) => {
        const existingProduct = cart.find((cartItem)=> cartItem._id === product._id);

        if(!existingProduct) {
            //no existe producto en el carrito, se agrega
            addToCart(product);
            toast.success("Producto agregado al carrito");
        } else {
            //ya existe el producto en el carrito, validamos que no se alcance el maximo de stock
            if(existingProduct.toSell >= existingProduct.quantity){
                toast.warn('Ha alcanzaado el maximo de ' + existingProduct.quantity + 'productos en stock');
                return;
            } else {
                //si no ha alcanzado el maximo, se incrementa la cantidad
                incProduct(product._id);
                toast.success("Producto agregado al carrito")
            } //fin else
        } //fin else
    }; //fin de addingProduct

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-sm">
        <header className="flex justify-between">
            <h1 className="text-2xl font-bold">
                {product.name}
            </h1>
        </header>
        {
            isAdmin ? (
            <div className="flex gap-x-2 justify-end border-b-2 border-b-slate-200 my-2 py-2">
            <Tooltip title="Eliminar">
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
             onClick={()=>{
                //console.log(product._id)
                deleteProduct(product._id);
            }}>
                <IoTrashBinSharp/>
                </button>
            </Tooltip>
            <Tooltip title="Actualizar"> 
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                <Link to={'/products/' + product._id}>
                <IoPencilSharp/>
                </Link>
            </button>
            </Tooltip>   
            </div>
            ) :
            (
                <div className="flex items-center justify-end px-4 pt-2">
                    <Tooltip title="Agregar al carrito">
                        <button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
                            onClick={()=>{
                                addingProduct(product);
                                }}>
                                <IoBagAddSharp size={20}/>
                        </button>
                    </Tooltip>
                </div>
            )
        }
        <div className="flex justify-center">
            <img
                src={product.image}
                alt="Imagen del producto"
                width={200}
                height={200}
                className="max-h [200px] object-contain flex my-2 py-2"/>
        </div>
        <div className="flex">
            <p className="text-slate-300 my-2 flex">
                <span>Precio: {product.price}</span>
            </p>
        </div>
        <div className="flex">
            <p className="text-slate-300 my-2 flex">
                <span>Cantidad: {product.quantity}</span>
            </p>
        </div>
    </div>
  )
}

export default ProductCard