import React ,{Component} from 'react'
import {ProductConsumer} from '../Context'
import {Link} from 'react-router-dom'
import {ButtonContainer} from './Button'

export default class Details extends Component{
	render(){
		return(
			<div>
			<ProductConsumer>
			{(value=>{//Debemos incluir toda la página dentro de ProductConsumer para poder acceder a la información que contiene
			//Declaro las constante con los nombres exactos que tienen originalmente.
			//Así, recibo todos los valores de Product Consumer al declarar el value (éste value coincide con el valor del parámetro) de la función. No confundir con el value declarado en ProductProvider. Ese debe ser value si o si
			const {id,company,title,img,price,info,inCart,count,total}= value.detailProduct
			return(
				<div className='container py-5'> {/*py=> padding bottom*/}
				{/*title*/}
					<div className='row'>
						<div className='col-10 mx-auto text-center text-slanted text-blue my-5'>
					{/*col-10 => Columna de tamaño 10 col respecto del ancho de la pantalla
						my=> margin bottom */}
					<h1>{title}</h1>
						</div>
					</div>	
				{/*end title*/}	
			{/*Product info*/}
					<div className='row'>
						<div className='col-10 mx-auto col-md-6 my-3'>
					{/*col-md => Será cuando se alcance la mita de la pantalla*/}
						<img src={img} className='img-fluid' alt='product'/>{/*img-fluid => La imagen no vaya afuera del div que la contiene*/}
						</div>
					{/*Product text*/}
						<div className='col-10 mx-auto col-md-6 my-3 text-capitalize'>					
							<h2>modelo: {title}</h2>
							<h4 className='text-title text-uppercase text-muted mt-3 mb-2'>empresa: 
								<span className="text-uppercase">
								{` ${company}`}
								</span>
							</h4> {/*text-muted => Color gris mt => margin top mb =>margin bottom*/}
							<h4 className='text-blue'>
							<strong>
							precio: <span>$</span> {price}
							</strong> 
							</h4>
							<p className='text-capitalize font.weight-bold mt-3 mb-0'>
							información del producto:
							</p>
							<p className='text-muted lead'>{info}</p>
							{/*Buttons*/}
							<Link to='/'>
								<ButtonContainer>
								regresa a los productos
								</ButtonContainer>
							</Link>	
							<Link to='/details'>
								<ButtonContainer 
								cart
								disabled={inCart? true:false}
								onClick={()=> {
									value.addToCart(id)
								}}
								>
								{inCart?'agregado':'agregar al carrito'}
								
								</ButtonContainer>
							</Link>	
						</div>	
					</div>		
				</div>
				)
			})}
			</ProductConsumer>
			</div>
			)
	}
}