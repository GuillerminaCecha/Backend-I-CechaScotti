import { useState } from "react";
import notificacions from "../helpers/useNotifications";

export const Login = () => {
    const {notiToastInvalidSessionData, notiToastLoginSuccess} = notificacions()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null)
    const isLogged = () => {if(localStorage.getItem('token')){return true}else{return false}}

    const handleLogin = () => {
        fetch("http://localhost:8080/api/sessions/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    localStorage.setItem('token', data.payload);
                    console.log('Token guardado en localStorage');
                    setToken(data.payload)
                    notiToastLoginSuccess()
                } else {
                    localStorage.removeItem('token');
                    console.error(data.message);
                    notiToastInvalidSessionData(data.message)
                }
            })
            .catch((error) => console.log(error));
    };

    return <>

    <main className="container-main">
        { !isLogged(token) ? (<section className="container d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center justify-content-center section-border pt-3 pb-3">
                <h1>Bienvenido</h1>
                <h3>Por favor, inicia sesión para continuar</h3>
                <div className="w-75">
                    <div className="mb-3 mt-3">
                        <input required type="email" className="form-control" id="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <input required type="password" className="form-control" id="password" placeholder="Contraseña"
                        name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="container-btns">
                        <button onClick={handleLogin} className="btn btn-primary">Iniciar sesión</button>
                        <a className="mt-2 ms-2" href="http://localhost:8080/sessions/register"><button className="btn btn-info btn-sm">Registrarse</button></a>
                    </div>
                </div>
            </div>
        </section>) : <h1>Bienvenido nuevamente</h1>}

    </main>
    </>
}