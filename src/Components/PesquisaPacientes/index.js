import React, { useState } from 'react';
import pacienteService from "../../services/pacienteService";
import styles from '../PesquisaPacientes/styles.module.scss'

import { InputGroup, FormControl, Button, Form, Col } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';


function PesquisaPacientes(props) {

    const [search, setSearch] = useState('');

    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        refreshPacientes();
        return () => {
        }
    }, [])

    async function refreshPacientes() {
        pacienteService.retrieveAllPacientes()
            .then(
                response => {
                    setPacientes(response.data)
                }

            )
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        const results = pacientes.filter(paciente => paciente.nome.toLowerCase().indexOf(search) !== -1 ||
                                                     paciente.uf.toLowerCase().indexOf(search) !== -1 );
        props.setPacientes(results);
    }

    function handleSearchChange(event) {
        setSearch(event.target.value.toLowerCase());
    }
    return (
        <div>
            <Form onSubmit={handleOnSubmit} className={styles.pesquisa}>
                <Form.Row>
                    <Col>
                        <InputGroup>
                            <FormControl
                                placeholder="Pesquise por nome ou UF"
                                aria-label="Pesquise por nome ou UF"
                                onChange={handleSearchChange}
                            />
                            <InputGroup.Append>
                                <Button type="submit">
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Form.Row>
            </Form>
        </div>
    );
}

export default PesquisaPacientes;