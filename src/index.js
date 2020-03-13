import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ProductProvider} from './Context'
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
	//Colocamos la API del Contexto en lo mas alto de la aplicación para poder acceder a la info desde cualquier lugar.
	//Lo bueno de trabajar así es que no se debe pasar esta informacion por todos los componentes. Solo donde lo necesito

	<ProductProvider>
	<Router>
	<App />
	</Router>
	</ProductProvider>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
