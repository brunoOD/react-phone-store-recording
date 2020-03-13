import React , {Component}from 'react'
import {Link} from 'react-router-dom'
import logo from '../edenor.png'
//Librería styled components (Se utiliza para generar constantes de los estilos css)
import styled from 'styled-components'
//Button container es una constante JSX por eso se obtiene entre llave. Lo mismo para todos los casos con llave que se obtiene de React
import {ButtonContainer} from './Button.js'


export default class Navbar extends Component{
	render(){
		return(
			<NavWrapper className="navbar bg-primary navbar-expand-sm navbar-dark px-sm-5">

			<Link to="/">
			<img width='150rem' src={logo} alt='store' className="navbar-brand"/>
			</Link>

			<ul className="navbar-nav align-items-center">
					<li className="nav-items ml-5">
							<Link to="/" className="nav-link">
							productos
							</Link>
					</li>
			</ul>
			<Link to='/cart' className='ml-auto'>
					<ButtonContainer>
						<span className="mr-2">
						<i className="fa fa-cart-plus"/>
						 mi carrito
						 </span>
					</ButtonContainer>
			</Link>
			</NavWrapper>

		)
	}
}

const NavWrapper=styled.nav`
background:var(--mainBlue);
.nav-link{
//El seteo de !important se utilizar para sobreescribir
	color:var(--mainWhite) !important;
//la medida rem se utiliza respecto del root. 
//bootstrap utiliza rem
	font-size:1.3rem;
	text-transform:capitalize
}
`





