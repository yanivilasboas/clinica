
import { Select } from 'antd';
import { useEffect, useState } from "react";
import { fetchEstados } from '../../Auxiliares/ibge';



const { Option } = Select;

const Estados = () => {

    const [estados, setEstados] = useState([]);

    useEffect(() => {
        fetchEstados().then((estados) => {
            setEstados(estados);
        }
        );
    }, []);

    return (
        <Select id="Estado">
            <Option value="" disabled> Selecione a UF</Option>
            {estados.map((estado) => {
                const { sigla, nome} = estado;
                return (
                    <Option  key={sigla} value={sigla}>{sigla} - {nome}</Option>
                );
            })}
        </Select>
    );
};

export default Estados;