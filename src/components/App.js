import React, { Component } from 'react';
import Productos from './producto/Productos';
import AddProducto from './producto/AddProducto'

import AddItem from './factura/AddItem';
import Items from './factura/Items';

class App extends Component{

    state = {
        facturaId: 0,
        productos:[],
        items: []
      }

      componentDidMount() {
        this.crearFactura();
      }


      getProductos() {
        fetch('http://localhost:8090/v1/allProducto')
        .then(response => response.json())
        .then(data => this.setState({ 
          ...this.state,
          productos: data
        }));
      }

      getItems() {
        fetch(`http://localhost:8090/v1/facItem/${this.state.facturaId}`)
        .then(response => response.json())
        .then(data => this.setState({ 
          ...this.state,
          items: data
        }));
      }

      crearFactura() {

        const clienteId = prompt('Digite la cédula del cliente');

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({clienteId: clienteId})
          };
        fetch('http://localhost:8090/v1/factura', requestOptions)
          .then(response => response.json())
          .then((facturaId) => {

            if(facturaId !== -1) {
              this.setState({
                ...this.state,
                facturaId: facturaId
              });
            
              this.getProductos();
            }
          });
      }


      addProducto = (newProducto) => {
        
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProducto)
          };
          fetch('http://localhost:8090/v1/producto', requestOptions)
              .then(response => response.json())
              .then(() => this.getProductos());
        
      }

      addItem = (newItem) => {
        
        newItem.facturaId = this.state.facturaId;

        console.log(newItem);

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem)
          };
          fetch('http://localhost:8090/v1/item', requestOptions)
              .then(response => response.json())
              .then(() => this.getItems());
        
      }

      
      // cuando presione el boton editar, recibe el index desde Productos.js
      pressEditBtn = (i) => {
        let productos = this.state.productos;
        productos[i].isEditing = true;
        this.setState({
          ...this.state,
          productos
        });
      }


      updateProducto = (idProducto, newProducto) => {
        
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProducto)
          };
          fetch(`http://localhost:8090/v1/producto/${idProducto}`, requestOptions)
              .then(response => response.json())
              .then(() => this.getProductos());
        
      }

      pressDeleteProducto = (idProducto) => {
        
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
          };
          fetch(`http://localhost:8090/v1/producto/${idProducto}`, requestOptions)
              .then(response => response.json())
              .then(() => this.getProductos());
      }

      pressDeleteItem = (idItem) => {
        
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
          };
          fetch(`http://localhost:8090/v1/item/${idItem}`, requestOptions)
              .then(response => response.json())
              .then(() => this.getItems());
      }

      calcularTotal = () => {

          fetch(`http://localhost:8090/v1/calcular/${this.state.facturaId}`)
          .then(response => response.json())
          .then(data => alert(`El Total de la factura es $${data}` )); //TOTAL DE LA FACTURA

      }
      
    render(){
        return(
            <div className="container">
                <h1>Productos</h1>
                <Productos allProductos={this.state.productos} pressEditBtn={this.pressEditBtn} pressDeleteProducto={this.pressDeleteProducto} updateProducto={this.updateProducto} />
                <AddProducto addProducto={this.addProducto}/>

                <hr></hr>

                <h1>Factura</h1>
                <Items allItems={this.state.items} pressDeleteItem={this.pressDeleteItem} />
                <AddItem allProductos={this.state.productos} addItem={this.addItem}/>

                <button className="btn green black-text" onClick={this.calcularTotal}>
                  Calcular Total
                </button>

                <br></br>

            </div>
        );
    }
}

export default App;