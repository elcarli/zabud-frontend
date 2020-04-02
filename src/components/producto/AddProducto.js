import React,{ Component } from 'react';

class AddProducto extends Component{

    state = {
        nombre:'',
        valor:0
    }
    //call addProducto (App.js)
    enviar = (e) => {
        e.preventDefault();
        this.props.addProducto(this.state);  
        e.target.reset();

    }
    // update state
    updateState = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
        });
    }

    render(){
        return(
            <div className="row">
                <form onSubmit={this.enviar}>
                    <div className="input-field col s4">
                        <input name="nombre" autoComplete="off" placeholder="Ingresa el nombre" required type="text" onChange={ this.updateState} />
                    </div>
                    <div className="input-field col s2">
                        <input name="valor" autoComplete="off" type="number" required placeholder="Ingresa el valor" onChange={ this.updateState } />
                    </div>
                    <div className="input-field col s2">
                        <input type="submit" value="Add +" className="btn blue"/>
                    </div>
                </form>
            </div>
        );
    }
}
export default AddProducto;