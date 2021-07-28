import axios from "axios";

const apiURI = `https://gmm-cotizadores-qa.gnp.com.mx/configurador/seccion?id_seccion=`;

export const getSections = async (id) => axios.get(`${apiURI}${id}`);