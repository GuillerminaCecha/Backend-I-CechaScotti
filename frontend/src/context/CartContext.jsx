/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import nots from '../helpers/useNotifications';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	const { notiToastWarn, notiToastSuccess, notiToastError, notiToastInvalidSessionData } = nots();

	const removeList = () => setCart([]);

    const getCartById = async () => {
        const cart = []
        const cartId = localStorage.getItem('cartId')
        const token = localStorage.getItem('token')

        if(!cartId || !token ) throw(new Error("No podes estar aca"))
        
        try {
            const response = await fetch(`http://localhost:8080/api/carts/${cartId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                credentials: 'include',
            });

            const data = await response.json()
      
            if(data.status){
                cart.push(...data.payload.products)
            }

            return cart
        } catch (error) {
            console.log(error.message)
        }

    }

    const addItem = (item, cantidad) => {

        const token = localStorage.getItem('token')
        const cartId = localStorage.getItem('cartId')
        const productId = item.id

        if(!token) return notiToastInvalidSessionData("Sesion no iniciada")
        if(!cartId){
            fetch("http://localhost:8080/api/carts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ token })

            })
            .then(res => res.json())
            .then((data) => {
                if(data.status){
                    const idCart = data.payload._id;
                    localStorage.setItem("cartId", idCart);

                    fetch(`http://localhost:8080/api/carts/${idCart}/product/${productId}`, {
                    method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: 'include',
                        body: JSON.stringify({ token })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if(data.status) {notiToastSuccess()}
                    });
                }
            })
            .catch((error) => console.log(error.message));
        } else {

            fetch(`http://localhost:8080/api/carts/${cartId}/product/${productId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                credentials: 'include',
                body: JSON.stringify({ token })
            })
                .then((response) => response.json())
                .then((data) => {if(data.status){notiToastWarn()}})
                .catch((error) => console.log(error.message));;
        }

        // const itemAAgregar = { ...item, cantidad };
		// const carrito2 = [...cart];
		// const estaEnCart = carrito2.find((item) => item.id === itemAAgregar.id);
		// if (estaEnCart) {
		// 	estaEnCart.cantidad += cantidad;
		// 	notiToastWarn();
		// } else {
		// 	carrito2.push(itemAAgregar);
		// 	setCart(carrito2);
		// 	notiToastSuccess();
		// }
	};

	const deleteItem = (id) => {
		const lugarEnCarrito = cart.findIndex((prod) => prod.id === id);
		const carritoAlt = [...cart];
		carritoAlt.splice(lugarEnCarrito, 1);
		setCart(carritoAlt);
		notiToastError();
	};

	const precioTotal = () => {
		return cart.reduce((acc, item) => acc + item.price * item.cantidad, 0);
	};

	return (
		<>
			<CartContext.Provider
				value={{
					cart,
					setCart,
					removeList,
					addItem,
					precioTotal,
					deleteItem,
                    getCartById
				}}
			>
				{children}
			</CartContext.Provider>
		</>
	);
};