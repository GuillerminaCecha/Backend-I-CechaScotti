import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link  } from 'react-router-dom';
import { CartWidget } from './CartWidget';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';




export const NavBar = () => {
	const { getCartById } = useContext(CartContext);


    const getCantidadProd = async () => {
        try {
            const cart = await getCartById()
            return cart.length
        } catch (error) {
            console.log(error.message)
        }
    }
    let quantity = 0
    getCantidadProd().then(result => quantity = result)

    console.log(quantity)

	return (
		<Navbar className="fondoNav">
			<Navbar.Brand to="/" as={Link} className="text-links">
				Automotores Bianca
			</Navbar.Brand>
			<Nav className="me-auto">
				<Nav.Link to="/products" as={Link} className="text-links">
					Productos
				</Nav.Link>

				<NavDropdown title="Categorias" id="basic-nav-dropdown">
					<NavDropdown.Item to="/products/sedan" as={Link}>
						Sedan
					</NavDropdown.Item>
					<NavDropdown.Item to="/products/suv" as={Link}>
						SUV
					</NavDropdown.Item>
					<NavDropdown.Item to="/products/truck" as={Link}>
						Truck
					</NavDropdown.Item>
					<NavDropdown.Item to="/products/convertible" as={Link}>
						Convertible
					</NavDropdown.Item>
					<NavDropdown.Item to="/products/hatchback" as={Link}>
						Hatchback
					</NavDropdown.Item>
				</NavDropdown>
			</Nav>
			<Link to="/cart">
				<CartWidget cant={cantidadProd} />
			</Link>
		</Navbar>
	);
};