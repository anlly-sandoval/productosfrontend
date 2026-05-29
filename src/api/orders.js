import axios from './axiosInstance';

//llamada para agregar un pedido
export const createOrderRequest = (order) => axios.post('/order', order);

//llamada para actualizar el estado de una orden
export const updateStatsOrderRequest = (id, status) => axios.put('/order/'+id, status);

//llamada para obtener todas las ordenes para el admin
export const getOrdersRequest = () => axios.get('/order');

//llamda al api para obtener todas las ordenes para un usuario
export const getUserOrderRequest = () => axios.get('/order/getuserorders');

//llamada al api para obtener una orden por id
export const getOrderByIdRequest = (id) => axios.get('/order/'+id);

//llamada al api para eliminar una orden
export const deleteOrderRequest =  (id) => axios.delete('/order/'+id);