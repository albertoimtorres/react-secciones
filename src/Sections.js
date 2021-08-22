import React, {useState} from 'react';
import { TableSection } from './components/TableSection';

export const Sections = () => {

    const sections = [1,2,3,4,5,'Seleccione una sección'];

    const [section, setSection] = useState(1);

    const handlerOnChange = e => {
        if (!isNaN(e.target.value)) setSection(+e.target.value);
        else setSection(e.target.value);
    }

    return (
        <>
            <h2>Secciones</h2>
            <select onChange={handlerOnChange}>
                {
                    sections.map(section => (
                        <option key={section}>{section}</option>
                    ))
                }
            </select>
            <hr/>
            <TableSection section={ section } />
        </>
    )
}
