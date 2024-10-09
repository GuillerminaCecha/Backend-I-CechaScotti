/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';

import { Botones } from './Botones';
import { CardSubtitle } from 'react-bootstrap';

export const Item = ({ props }) => {

    
	return (
		<>
			<Card style={{ width: '18rem' }} >
				<Card.Img variant="top" src={props.thumbnail} className="card-img" />
				<Card.Body>
					<Card.Title>
						{props.title} 
					</Card.Title>
                    <Card.Text>
                        {props.description} 
                    </Card.Text>
					<Card.Subtitle>
						Precio: $ {props.price.toLocaleString()}
					</Card.Subtitle>
					<Card.Text className="mb-1">
						Categoria: {props.category}
					</Card.Text>

					<Button
						className="mb-2"
						variant="outline-secondary"
						to={`/item/${props.id}`}
						as={NavLink}
						size="sm"
					>
						Info
					</Button>
					<Botones item={props} />
				</Card.Body>
			</Card>
		</>
	);
};