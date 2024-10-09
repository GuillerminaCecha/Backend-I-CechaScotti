import { Login } from "./Login";

export const Home = () => {
	return (
		<div className="container-home">
			<div className="container-login">
				<div className="textos">
					<h1 className="titulo">Bienvenidos a Automotores Bianca</h1>
					<h2 className="sub-titulo">Tu lugar de confianza</h2>
				</div>
				<Login />
			</div>
		</div>
	);
};