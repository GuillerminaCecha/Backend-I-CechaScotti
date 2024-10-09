import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyAy8BEcbSTxgpnjlom_8BYI4tCxLurk05g',
	authDomain: 'e-commerce-bianca.firebaseapp.com',
	projectId: 'e-commerce-bianca',
	storageBucket: 'e-commerce-bianca.appspot.com',
	messagingSenderId: '135102658818',
	appId: '1:135102658818:web:f1f1631981cd22256fea1b',
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);