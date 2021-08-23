import PropTypes from 'prop-types';
import React, {useState} from 'react';

export const Modal = ({ onClose, show, catalog: {catalogo}, callback, setCatalog, reference }) => {

    const headers = ['#', 'Id Valor', 'Seleccionar', 'Descripción', 'Orden'];

    const [catalogs, setCatalogs] = useState([]);

    if (!show) return null;

    const handleOnChange = (catalog, e) => {
        const {checked} = e.target;

        const {indice_orden, descripcion, ...rest} = catalog;

        if (checked) {
            setCatalogs(element => [rest, ...element]); //! Añade dinamicamente elementos.
        } else {
            const index = catalogs.findIndex(element => element.id_valor === rest.id_valor);
            setCatalogs([...catalogs.slice(0, index), ...catalogs.slice(index + 1, catalogs.length)]); //! Remueve elementos dinamicamente.
        }
    }

    //! Deschequea el checkbox
    const unChecked = id => document.getElementById(id).checked = false;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Secciones - Catalogo</h4>
                </div>

                <div className="modal-body">

                    <table>
                        <thead>
                            <tr>
                                { headers.map(header => (<th key={ header }>{ header.toUpperCase() }</th>)) }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                catalogo?.valores?.map((catalog, index) => (
                                    <tr key={ catalog.id_valor }>
                                        <td>{ index + 1 }</td>
                                        <td>{ catalog.id_valor }</td>
                                        <td>{catalog.descripcion}</td>
                                        <td> <input type='checkbox' onChange={ handleOnChange.bind(this, catalog) } /> </td>
                                        <td>{catalog.indice_orden}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>

                <div className="modal-footer">
                    <button onClick={ () => {

                        if (!catalogs.length) {
                            unChecked(reference.current);
                        } else {
                            unChecked(reference.current);
                        }

                        onClose(false);

                    }} className="modal-button-close">Cerrar</button>
                    <button
                        onClick={ () => {

                            if (!catalogs.length) return;
                            
                            callback(catalogs);
                            onClose(false);
                        }}
                        className="modal-button-success"
                    >Aceptar</button>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    show: PropTypes.bool,
    catalog: PropTypes.object
}
