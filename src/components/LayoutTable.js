import React, {useState, useRef} from 'react';

import { Modal } from './Modal';

export const LayoutTable = ({ sections }) => {

    const headers = ['#', 'Id Campo', 'Seleccionar', 'Etiqueta'];

    const [catalog, setCatalog] = useState({});

    const [show, setShow] = useState(false);

    const reference = useRef(null);

    const handleOnChange = (section, e) => {
        const {checked} = e.target;

        if ('catalogo' in section) {

            reference.current = `section_${section.id_campo}`;

            if (checked) {
                setShow(true);
                setCatalog({...section});
            } else {
                setShow(false);
            }

        } else {
            console.log('NO TIENE LA LLAVE');
        }
    }

    const handleAccept = (catalog) => {
        console.log('CALLBACK: ', catalog);
    }

    // const handleRef = () => {
    //     console.log('¿ENTRA EN HANDLE REF?');
    //     // reference.current = 'section_' + section.id_campo;
    // }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        { headers.map(header => (<th key={ header }>{ header.toUpperCase() }</th>)) }
                    </tr>
                </thead>
                <tbody>
                    {
                        sections.map((section, index) => (
                            <tr key={ section.id_campo }>
                                <td>{ index + 1 }</td>
                                <td>{section.id_campo}</td>
                                <td> <input type='checkbox' id={`section_${section.id_campo}`} reference={`section_${section.id_campo}`} onChange={ handleOnChange.bind(this, section) } /> </td>
                                <td>{section.etiqueta}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Modal onClose={() => setShow(false)} show={show} catalog={catalog} callback={ handleAccept } setCatalog={ setCatalog } reference={reference} />
        </div>
    )
}

