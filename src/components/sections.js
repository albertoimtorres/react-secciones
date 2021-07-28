import React from 'react';
import {getSections} from '../services/section.service';
import _ from 'lodash';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class Sections extends React.Component {

    state = {
        sections: [],
        showModal: false,
        headers: ['#', 'Id Campo', 'Seleccionar', 'Etiqueta']
    }

    sectionIds = [
        1,2,3,4,5
    ];

    constructor() {
        super()
    }

    componentDidMount() {
        getSections(1)
        .then(res => {
            let sections = res.data.secciones[0];
            this.setState({sections});
        })
        .catch(error => {
            throw new Error(error);
        });
    }

    renderHeader() {
        let headers = this.state.headers;
        return headers.map((head, index) => {
            return (
                <th key={index}>{head.toUpperCase()}</th>
            )
        });
    }

    rederSection() {
        let html = '';
        let sections = this.state.sections;

        return sections.campos?.map((campo, index) => {
            const {id_campo, etiqueta} = campo;
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{id_campo}</td>
                    <td><input type="checkbox" onChange={this.handlerCheckBox.bind(this)} id={'campo_ ' + id_campo} value={campo.id_campo}/></td>
                    <td>{etiqueta}</td>
                </tr>
            )
        });
    }

    handlerCheckBox(event) {
        const {value, checked} = event.target;

        if (checked) {
            this.handlerModalOpen();
        } else {
            this.handlerModalClose();
        }
    }

    handlerModalOpen() {
        this.setState({showModal: true});
    }

    handlerModalClose() {
        console.log('CIERRA MODAL');
        this.setState({showModal: false});
    }

    render() {
        return (
            <div id="app-section">
                <table>
                    <thead>
                        <tr>
                            {this.renderHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.rederSection()}
                    </tbody>
                </table>

                <Modal isOpen={this.state.showModal}>
                    <button onClick={this.handlerModalClose.bind(this)}>Close Modal</button>
                </Modal>
            </div>

        );
    }
}

export default Sections;