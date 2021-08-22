// import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import { MessageSection } from './MessageSection';
import { LayoutTable } from './LayoutTable';

export const TableSection = ({ section }) => {

    const [sections, setSections] = useState([]);

    useEffect(() => {
        getSection();
    }, [
        section
    ]);

    const getSection = async () => {

        if (typeof section !== 'string') {
            const {secciones} = await (await fetch(`https://gmm-cotizadores-qa.gnp.com.mx/configurador/seccion?id_seccion=${section}`)).json();
            const [{campos}] = secciones;

            setSections(campos);
        }
    }

    // console.log('Sections: ', sections);

    return (
        <>
            { typeof section === 'string' ? <MessageSection /> : <LayoutTable sections={ sections } /> }
        </>
    )
}

// TableSection.propTypes = {
//     section: PropTypes.number.isRequired
// }