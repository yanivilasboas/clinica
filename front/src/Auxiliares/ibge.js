const BASE_URL = 'https://servicodados.ibge.gov.br/api/v1'

export const fetchEstados = () => {
    const url = `${BASE_URL}/localidades/estados?orderBy=nome`;
    return fetch(url).then(response => response.json());
}