import React, {Component} from 'react'
import {storeProducts, detailProduct} from './data'

//Utilizamos la API context.

//Creamos un nuevo objeto createContext
const ProductContext =React.createContext();

//El objeto createContext viene con dos componentes: Provider, Consumer
//Provider:Provee la información para toda la aplicación. Provider se encuentra en lo mas alto de la aplicación
//Consumer: Cada vez que querramos usar la info de Provider, accedemos a Consumer. Podremos obtener la info desde cualquier lugar de la aplicación sin tener que pasar los props a través componentes hijos
//Lo obtenemos a partir del nombre aleatorio ProductProvider. El nombre ProductProvider será el que luego deberemos exportar

class ProductProvider extends Component{

	state= {
		//products será el objeto que contiene la información. Lo declaramos en primera instancia como vacío
		products: [],
		//detailProduct contiene un producto específico que fue seleccionado.
		detailProduct: detailProduct,
		cart:[],
		//state que pregunta si el modal está abierto o no
		modalOpen:false,
		//state que requiere del producto seleccionado (desde el id) y así mostrar el producto correcto
		modalProduct: detailProduct,
		cartSubTotal:0,
		cartTax:0,
		cartTotal:0
		}
//Con component DidMount damos inicio a la función que copiará los datos a el objeto 'products'
componentDidMount(){
	this.setProducts();
}

setProducts=()=>{
	let tempProducts=[];
	//Hago un loop a través de los arrays de storeProducts (data.js) para copiar todos sus valores
	//Cada item es un objeto, ya que se trata de un array de objetos
	storeProducts.forEach(item=>{
		//... => Es una forma sencilla de hacer referencia a todos los objetos manteniendo el mismo nombre		
		const singleItem={...item};
		//El array products incluirá todo los products anteriores(...tempProducts) y en cada iteración agregará ese item de esa iteración (singleItem)
		tempProducts=[...tempProducts,singleItem]
	})
	this.setState(()=>{
		return {products: tempProducts}
//Si a 'tempProducts' lo hubiéramos llamado 'products' (al igual que el objeto declarado en state) entonces el return se podría hacer así:
// return{products}
	})
}



//método que obtiene un producto específico a partir del id.
//Se usa en varias funciones, todas le pasan el id como parámetro y esta función busca en los productos (meidante find) cual es la que coincide

getItem = id => {
	//con find buscamos el id del item que coincida con el item que esta siendo pasado como parámetro
	const product = this.state.products.find(item=>item.id===id);
	return product
}

handleDetail = id => {
	const product= this.getItem(id);
	this.setState(()=>{
		return{detailProduct: product}
	})
}	
addToCart= id => {
	let tempProducts=[...this.state.products]
	//indexOf obtiene el index del objeto solicitado
	const index = tempProducts.indexOf(this.getItem(id))
	//Declaramos product como el producto que es obtenido por el index (previamente obetenido por el id)
	const product = tempProducts[index]
	//Al aplicar este método, ahora este producto.incart pasa a ser true
	product.inCart=true
	product.count=1
	const price= product.price
	product.total=price
	this.setState(
		() => {
		return{
			//Modificamos el valor de products al actualizado
			products:tempProducts,
			//la propiedad cart tendrá el estado previo de cart mas el nuevo producto
			//El array cart es mediante el cual podemos ver la cantidad comprada de productos
			cart:[...this.state.cart,product]
				}
			},
		() => {
			//Cada vez que ejecutamos el agregado al carrito ejecutamos que se agreguen los totales
				this.addTotals()
		}
	)

}	

openModal = id =>{
	const product = this.getItem(id)
	this.setState(()=>{
		return {
			modalProduct: product,
			modalOpen:true
		}
		console.log(this.state.modalProduct)
	})
}

closeModal = () => {
	this.setState(()=>{
		return {
			modalOpen:false
		}

	})
}

increment = id => {
	let tempCart = [...this.state.cart]
	const selectedProduct = tempCart.find(item=>item.id===id);
	const index = tempCart.indexOf(selectedProduct)
	const product= tempCart[index]

	product.count=product.count + 1
	product.total = product.price * product.count

	this.setState(()=>{
		return{
			cart:[...tempCart],

		}
	},()=>{
		this.addTotals()
	})




}

decrement = id => {
	let tempCart = [...this.state.cart]
	const selectedProduct = tempCart.find(item=>item.id===id);
	const index = tempCart.indexOf(selectedProduct)
	const product= tempCart[index]

	product.count=product.count - 1

	if(product.count === 0){
		this.removeItem(id)
	}else{
	product.total = product.price * product.count
	
	this.setState(()=>{
		return{
			cart:[...tempCart],

		}
	},()=>{
		this.addTotals()
	})

	}
}

removeItem = id => {
	let tempProducts = [...this.state.products]
	let tempCart = [...this.state.cart]
	//Removemos el producto que se corresponde con el id
	tempCart = tempCart.filter(item => item.id != id)
	
	const index = tempProducts.indexOf(this.getItem(id))
	//Declaramos product como el producto que es obtenido por el index (previamente obetenido por el id)
	const removedProduct = tempProducts[index]

	
	

	removedProduct.inCart=false
	removedProduct.count=0
	removedProduct.total=0

	this.setState(() =>  {
			return{
			//Modificamos el valor de products al actualizado
			products:[...tempProducts],
			//la propiedad cart tendrá el estado previo de cart mas el nuevo producto
			//El array cart es mediante el cual podemos ver la cantidad comprada de productos
			cart:[...tempCart]
			 

				}
			},
		() => {
			//Cada vez que ejecutamos el agregado al carrito ejecutamos que se agreguen los totales
				this.addTotals()
			}
		
			
	)
}

clearCart = ()=> {
this.setProducts()
this.setState(()=>{
	
	return {
		cart:[],
		

		}
	})
}

addTotals= () =>{
	let subTotal=0
	this.state.cart.map(item => (subTotal += item.total))
	const tempTax=  subTotal*0.1
	const tax = parseFloat(tempTax.toFixed(2))
	const total= subTotal + tax
	this.setState(()=> {
		return {
		cartSubTotal:subTotal,
		cartTax:tax,
		cartTotal:total
		}
		
	})

}

render(){
	return(
		//Generamos el provider, desde donde saldrá la info
		//Lo que retornamos es la instancia Provider del objeto ProductContext. Recordar que este ProductContext es un objeto de la api createContext
		<ProductContext.Provider 
		//Debemos usar el prop determinado "value"
		value={{
		// Con {...this.state} se están pasando todos los objetos state
		...this.state,
		//Los métodos no se pasan en {...thisstate}. Se debe ingresar en value
		handleDetail:this.handleDetail,
		addToCart:this.addToCart,
		openModal:this.openModal,
		closeModal:this.closeModal,
		increment: this.increment,
		decrement: this.decrement,
		removeItem: this.removeItem,
		clearCart: this.clearCart,
		addTotals:this.addTotals
			}}
			>
		
		{this.props.children //Debido a que Provider se encuentra en lo mas alto de los componentes. Queremos retornar todos hijos que tenga
		}

		</ProductContext.Provider>
		)
	}
}

//Declaramos la instancia Consume del nuevo objeto ProductContext
const ProductConsumer=ProductContext.Consumer;

//Exportamos ProductProvider y ProductConsumer
export {ProductProvider,ProductConsumer}; 