import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom' //Librerías obtenidas de react. Sirven para hacer funcionar el spa
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import  ProductList from './components/ProductList'
import Details from './components/Details'
import Cart from './components/Cart'
import Default from './components/Default'
import Modal from './components/Modal'

class  App extends Component {
  render() {
  return (
     <React.Fragment>
     <Navbar/>
     	<Switch>
     		<Route exact path="/" component={ProductList}/>
     		<Route path="/Details" component={Details}/>
     		<Route path="/Cart" component={Cart}/>
     		<Route  component={Default}/>
     	</Switch>
     {/*El modal lo dejamos fuera del switch ya que es una ventana que no rutea. Si no que aparece junto a la ventana ProductList*/}
     <Modal/>
     </React.Fragment>
    )
  }
}

export default App;
