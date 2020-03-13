import React, {Component} from 'react'
import styled from 'styled-components'
import {ProductConsumer} from '../Context'
import {ButtonContainer} from './Button'
import {Link} from 'react-router-dom'

export default class Modal extends Component{
	render(){
		return(
			<ProductConsumer>
			{value=>{
				//Buscamos las constantes que nos interesan, que provienen del archivo Context.js
				const {modalOpen,closeModal}= value;
				const {title,img,price} = value.modalProduct

				if(!modalOpen){
					//Si es falso solo se devuelve null, es decir, desaparece
					return null
				}else{
					return (
					<ModalContainer>
					<div className='container'>
						<div className='row'>
							<div id='modal'
							className='col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5'> {/*mx => small screen size. md =>medium screen size. lg => large screen size*/}
							<h5>item agregado al carrito</h5>
							<img src={img} className='img-fluid' alt='product'/>	
							<h5>{title}</h5>						
							<h5 className='text-muted'>Precio: <span>$ </span>{price}</h5>
							<Link to='/'>
							<ButtonContainer onClick={() => closeModal()}>					
							continuar comprando
							</ButtonContainer>
							</Link>
							<Link to='/cart'>
							<ButtonContainer cart onClick={() => closeModal()}>  
							ver carrito
							</ButtonContainer>
							</Link>
							</div>



						</div>
					</div>	
					</ModalContainer>
				
				)
				}
			}}
			</ProductConsumer>
		
		)
	}
}

const ModalContainer= styled.div `

position:fixed;
top:0;
left:0;  /* Desde fixed hasta bottom marcamos una nueva pantalla que estará adelante mostrándose. Luego con background la damos baja opacidad para que se vea la pantalla anterior atrás */
right:0;
bottom:0;
background:rgba(0,0,0,0.3);
display: flex;  /* Con display y align lograremos centrar la pantalla*/
align-items:center;
justify-content:center;
#modal{
	background:var(--mainWhite);
}
`