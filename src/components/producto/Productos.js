import React, { Component } from 'react';

class Productos extends Component{

    
    editar = () => {
        const producto = {
            nombre: this.nombre.value,
            valor: this.valor.value
        }

        this.props.updateProducto(this.id, producto);
    }

    render(){

        const {allProductos, pressEditBtn, pressDeleteProducto} = this.props;

        const productosList = allProductos.map((producto, index) => {

            if (producto.isEditing  === true) {
                return (
                
                <tr  key={index}>
                    <td><input type="text" ref={(val) => {this.nombre = val}} required defaultValue={producto.nombre}/></td>
                    <td><input type="number" ref={(val) => {this.valor = val}} required defaultValue={producto.valor}/></td>
                    <td>
                    <input type="button" value="Update" onClick={this.editar} ref={() => {this.id = producto.id}} className="btn green"/>
                    </td>
                </tr>  

            )}
            else {
                return (

                    <tr  key={index}>
                        <td>{producto.nombre}</td>
                        <td>{'$' + producto.valor}</td>
                        <td><button className="btn yellow black-text" onClick={() => pressEditBtn(index)}>
                                Editar</button>  |  
                            <button className="btn red" onClick={() => pressDeleteProducto(producto.id)}>
                                Borrar</button>
                        </td>
                    </tr>
    
                );
            } 
        });

        return(
            <table className="striped">
                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Valor</th>
                    <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {productosList}
                </tbody>
            </table>
        );
    }
}

export default Productos;