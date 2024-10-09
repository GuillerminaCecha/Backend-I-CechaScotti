import { Spinner } from 'react-bootstrap';

export const Loading = () => {
	return (
		<div className="d-flex align-items-center justify-content-center mt-5">
			<h1>Cargando</h1>
			<Spinner animation="grow" size="sm" className="ms-2" />
			<Spinner animation="grow" size="sm" className="ms-2" />
			<Spinner animation="grow" size="sm" className="ms-2" />
		</div>
	);
};