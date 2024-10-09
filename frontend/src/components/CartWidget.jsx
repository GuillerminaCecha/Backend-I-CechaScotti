/* eslint-disable react/prop-types */
import cartImg from '../assets/carrito.svg';

export const CartWidget = ({ cant }) => {
	return (
		<>
			<img src={cartImg} title="Carrito" className="cart" />
			{cant !== 0 && <p className="contador-cart">{cant}</p>}
		</>
	);
};