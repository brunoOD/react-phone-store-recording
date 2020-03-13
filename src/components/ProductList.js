import React, {Component} from 'react'
import Product from './Product'
import Title from './Title'
//En cada componente se importa el Consumer, es decir, el que nos trae la información
import {ProductConsumer} from '../Context'


export default class ProductList extends Component{
	

	render(){
		
		return(
		<React.Fragment>
				<div className="py-5">
					<div className="container">
						<Title name="nuestros" title="productos"/>
						<div className="row">
							<ProductConsumer //Los props no están siendo pasados. Se tiene que usar una función para obtener esa información
							 >
							 {value=>{ //value será un parámetro que devolverá el value del componente Context
							return value.products.map(product=>{//Hace un mapeo a través del array, obteniendo toda la info de sus objetos
									return <Product key={product.id} product={product} />
								})
							}}

							</ProductConsumer>
						</div>
					</div>
				</div>
		</React.Fragment>
			)
	}
}