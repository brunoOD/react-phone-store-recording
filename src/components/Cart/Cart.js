import React, {Component}from 'react'
import Title from '../Title'
import CartColumns from './CartColumns'
import EmptyCart from './EmptyCart'
import {ProductConsumer} from '../../Context'
import CartList from './CartList'
import CartTotals from './CartTotals'

export default class Cart extends Component{
	render(){
		return(
			<section>
			<ProductConsumer>
			{value=> {
				const {cart}= value
				//Preguntamos si hay algún producto en el carrito
				if(cart.length>0){
				return(
					<React.Fragment>
						<Title name="tu" title="carrito"/>  
						<CartColumns />			{/*Tenemos 4 componentes: Title => Titulo de la página; CartColumns => Componentes que incluyen los titulos; CartList => Contiene el listado de productos; CartTotals => Tiene todos los totale de los productos*/}
						<CartList value={value}/>
						<CartTotals value={value}/>
					</React.Fragment>
				)}else{
				return(
					<EmptyCart />

				)}
			}}
			</ProductConsumer>		
			</section>
			)
	}
}