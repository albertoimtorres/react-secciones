import React, {useState, useRef} from 'react';

import { Modal } from './Modal';

export const LayoutTable = ({ sections }) => {

    const headers = ['#', 'Id Campo', 'Seleccionar', 'Etiqueta'];

    const [catalog, setCatalog] = useState({});

    const [Asection, setSections] = useState([]);

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

            const {etiqueta, obligatorio, ...rest} = section;

            if (!checked) {
                const index = Asection.findIndex(element => element.id_campo === rest.id_campo);
                setSections([...Asection.slice(0, index), ...Asection.slice(index + 1, Asection.length)]);
            }

            setSections(element => [rest, ...element]);
        }
    }

    const handleAccept = (catalog) => {

    }

    const onSubmit = () => {
    }

    return (
        <div className="table-container">
            <form>
                <table className="sections">
                    <caption>Secciones</caption>
                    <thead>
                        <tr>
                            { headers.map(header => (<th key={ header }>{ header.toUpperCase() }</th>)) }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sections.map((section, index) => (
                                <tr id={index} key={ section.id_campo }>
                                    <td>{ index + 1 }</td>
                                    <td>{section.id_campo}</td>
                                    <td> <input type='checkbox' id={`section_${section.id_campo}`} reference={`section_${section.id_campo}`} onChange={ handleOnChange.bind(this, section) } /> </td>
                                    <td className="label">{section.etiqueta}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button onClick={ onSubmit } className="success">Enviar</button>
            </form>
            <Modal onClose={() => setShow(false)} show={show} catalog={catalog} callback={ handleAccept } setCatalog={ setCatalog } reference={reference} />
        </div>
    )
}

