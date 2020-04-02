import React, { Component } from 'react';

class Items extends Component{

    render(){

        const {allItems, pressDeleteItem} = this.props;

        const itemsList = allItems.map((item, index) => {

          return (

            <tr  key={index}>
                <td>{item.cantidad}</td>
                <td>{item.productoNombre}</td>
                <td>{'$' + item.valorVentaUnidad}</td>
                <td>{'$' + item.valorTotal}</td>
                <td> 
                    <button className="btn red" onClick={()=>pressDeleteItem(item.id)}>
                        Borrar</button>
                </td>
            </tr>

          );
            
        });

        return(
            <table className="striped">
                <thead>
                    <tr>
                    <th>Cantidad</th>
                    <th>Producto</th>
                    <th>Precio unidad</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsList}
                </tbody>
            </table>
        );
    }
}

export default Items;