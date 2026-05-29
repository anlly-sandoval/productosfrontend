import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { 
    getProductsRequest, 
    createProductRequest, 
    deleteProductRequest, 
    getProductRequest,
    updateProductRequestNoUpdateImage,
    updateProductRequest,
    getAllProductsRequest
 } from "../api/products";

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if(!context)
        throw new Error("UseProducts debe estar en un contexto")

    return context;
}; //fin de useproducts


export function ProductsProvider({children}) {
    const [ products, setProducts ] = useState([]);
    const [ errors, setErrors ] = useState([]);
    const [ cart, setCart ] = useState([]);
    const [ address, setAddress ] = useState({});
    const [ payment, setPayment ] = useState({});
    const [ stepOrder, setStepOrder ] = useState(1);

    //funcion para obtener todos los productos de la base de datos
    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            //console.log(res);
            setProducts(res.data);
        } catch (error) {
            setErrors(error.response.data.message);
        }
    }; //fin de getproducts

    //funcion para crear un producto
    const createProduct = async (product) =>{
        try {
            await createProductRequest(product);
            getProducts();    
        } catch (error) {
            setErrors(error.response.data.message);   
        }
    }; //fin de create product

    //funcion para eliminar un producto
    const deleteProduct = async (id)=>{
        try {
            await deleteProductRequest(id);
            getProducts();
        } catch (error) {
            setErrors(error.response.data.message);
        }
    }; //fin de deleteproduct

    //funcion para obtener un producto por id
    const getProductById = async (id)=>{
        try {
            const res = await getProductRequest(id);
            return res.data;
        } catch (error) {
            setErrors(error.response.data.message);
        }
    }; //fin de getproductbyid

    //funcion para actualizar un producto sin cambiar la imagen
    const updateProductNoUpdateImage = async (id, product)=>{
        try {
            const res = await updateProductRequestNoUpdateImage(id, product);
            console.log(res);
        } catch (error) {
            setErrors(error.response.data.message);
        }
    }; //fin de updatesinimagen

    //funcion para actualizar un producto con cambio de imagen
    const updateProduct = async (id, product)=>{
        try {
            const res = await updateProductRequest(id, product);
            console.log(res);
        } catch (error) {
            setErrors(error.response.data.message);
        }
    }; //fin de updateproduct

    //useEffect que vacia el arreglo de errores pasados 5 sg
    useEffect(()=>{
        if(errors.length > 0){
            const timer = setTimeout(()=>{
                setErrors([])
            }, 5000)
            return ()=> clearTimeout(timer);
        } //fin de if
    }, [errors]); // fin de useeffect

    //funcion para obtener todos los productos de la base de datos para la compra
    const getAllProducts = async ()=>{
        try {
            const res = await getAllProductsRequest();
            setProducts(res.data)
        } catch (error) {
            setErrors(error.response.data.message);
            console.log(error);
        }
    } //fin de getAll

    /* FUNCIONES DEL CARRITO */

    //funcion para obtener el costo total del carrito
    const getTotalCost = ()=>{
        const total = cart.reduce(
            (total, cartItem)=> total + cartItem.price * cartItem.toSell, 0
        );
        return total.toFixed(2);
    } //gin de getTotalCost

    //funcion para vaciar carrito
    const clearCart = () => {
        setCart([]);
    }; //fin de clearCart

    //funcion para decrementar la cantidad de productos del carrito
    const incProduct = (idItem)=>{
        setCart((prevCart)=>
            prevCart.map((cartItem)=>
                cartItem._id === idItem
                    ? {...cartItem, toSell: cartItem.toSell + 1}
                    : cartItem
            )
        );
    } //fin de incProduct

    //funcion para decrementar la cantidad de productos del carrito
    const decProduct = (idItem)=>{
        setCart((prevCart)=>
            prevCart.map((cartItem)=>
                cartItem._id === idItem && cartItem.toSell > 1
                    ? {...cartItem, toSell: cartItem.toSell - 1}
                    : cartItem
            )
        );
    } //fin de decProduct

    //funcion para remover un item del carrito de compras
    const removeProduct = (idItem) => {
        setCart((prevCart)=> prevCart.filter((product)=> product._id !== idItem));
    }; //fin de removeProduct

    //funcion para agregar un producto al carrito
    const addToCart = (product) => {
        setCart((prevCart)=> {
            const existingProduct = prevCart.find((item)=> item._id === product._id);
            if(existingProduct) {
                //si el producto ya esta en el carrito, incrementa su cantidad
                return prevCart.map((item)=>
                    item._id === product._id
                    ? {...item, toSell: item.toSell + 1}
                    : item
                );
            } else {
                //si el producto no esta en el carrito, agregarlo como un nuevo item
                return [...prevCart, {...product, toSell: 1}];
            }
        }); 
    }; //fin de addToCart

    //funcion para calcular el total de productos del carrito
    const getTotalProducts = useMemo(()=> {
        return cart.reduce((total, product) => total + product.toSell, 0);
    }, [cart]); //fin de getTotalProducts

    //funcion para actualizar el estado de la direccion
    const updateAddress = (values) => {
        setAddress(values);
    }; //fin de updateAddress

    //funcion para actualizar el estado de los datos de pago
    const updatePayment = (values) => {
        setPayment(values);
    }; //fin de updatePayment

    //funcion para inicializar un pedido
    const initOrder = () => {
        setAddress({});
        setPayment({});
        setStepOrder(1);
    }; //fin de initOrder

    //funcion para actualizar el paso del estado de un pedido
    const updateStepOrder = (value) => {
        setStepOrder(value);
    }; //fin de updateStepOrder

    //funcion para calcular el total de impuestos 16%
    const calculateIva = (subtotal) => {
        return subtotal * 0.16;
    }; //fin de calculateIva

    //funcion para calcular el total (sin iva - impuestos)
    const calculateSubTotal = useMemo(()=>{
        return cart.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.toSell, 0
        );
    }, [cart]); //fin de calculateSubtotal

    //funcion para calcular el total como la suma del subtotal + iva
    const calculateTotal = useMemo(()=>{
        const subtotal = calculateSubTotal;
        const iva = calculateIva(subtotal);
        return subtotal + iva;
    }, [calculateSubtotal]);

    /* FIN DE FUNCIONES DEL CARRITO */

    return (
        <ProductContext.Provider value={{
            products,
            getProducts,
            createProduct,
            deleteProduct,
            getProductById,
            updateProductNoUpdateImage,
            updateProduct,
            errors,
            getAllProducts,
            cart,
            getTotalCost,
            clearCart,
            incProduct,
            decProduct,
            removeProduct,
            addToCart,
            getTotalProducts,
            address,
            updateAddress,
            payment,
            updatePayment,
            initOrder,
            stepOrder,
            updateStepOrder,
            calculateIva,
            calculateSubTotal,
            calculateTotal
            }}>
            {children}
        </ProductContext.Provider>
    )
}; //fin de productsprovider