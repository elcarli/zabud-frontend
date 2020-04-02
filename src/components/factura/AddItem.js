import React,{ Component } from 'react';

import M from 'materialize-css/dist/js/materialize.min.js'

class AddItem extends Component{

    state = {
        productoId:'',
        cantidad: 0
    }

    enviar = (e) => {
        e.preventDefault();
        this.props.addItem(this.state);  
        e.target.reset();

    }

    updateState = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
        });
    }

    componentDidMount() {
      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, {});
      });
    }

    render(){
      const {allProductos} = this.props;

      let productosList = allProductos.map((producto, key) => {
        return (
        
          <option key={key} value={producto.id}>
            {producto.nombre}
          </option>
        )

      });


      return(
          <div className="row">
              <form onSubmit={this.enviar}>
                  <div className="input-field col s4">
              
                  <select defaultValue={'DEFAULT'} name="productoId" className="browser-default" onChange={ this.updateState } >
                    <option value="DEFAULT" disabled hidden>Elija un producto</option>
                    {productosList}
                  </select>
            
                  </div>
                  <div className="input-field col s2">
                      <input name="cantidad" autoComplete="off" type="number" required placeholder="Cantidad" onChange={ this.updateState } />
                  </div>
                  <div className="input-field col s2">
                      <input type="submit" value="Add +" className="btn blue"/>
                  </div>
              </form>
          </div>
      );
    }
}
export default AddItem;