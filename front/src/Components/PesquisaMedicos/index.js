import React, { useState } from 'react';
import medicoService from "../../services/medicoService";
import styles from '../PesquisaMedicos/styles.module.scss'

import { InputGroup, FormControl, Button, Form, Col } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';


function PesquisaMedicos(props) {

    const [search, setSearch] = useState('');

    const [medicos, setMedicos] = useState([]);

    useEffect(() => {
        refreshMedicos();
        return () => {
        }
    }, [])

    async function refreshMedicos() {
        medicoService.retrieveAllMedicos()
            .then(
                response => {
                    setMedicos(response.data)
                }

            )
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        const results = medicos.filter(medico=> medico.nome.toLowerCase().indexOf(search) !== -1 );
        props.setMedicos(results);
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
                                placeholder="Pesquise por nome"
                                aria-label="Pesquise por nome"
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

export default PesquisaMedicos;