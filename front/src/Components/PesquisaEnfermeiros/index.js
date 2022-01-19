import React, { useState } from 'react';
import enfermeiroService from "../../services/enfermeiroService";
import styles from '../PesquisaEnfermeiros/styles.module.scss'

import { InputGroup, FormControl, Button, Form, Col } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';


function PesquisaEnfermeiros(props) {

    const [search, setSearch] = useState('');

    const [enfermeiros, setEnfermeiros] = useState([]);

    useEffect(() => {
        refreshEnfermeiros();
        return () => {
        }
    }, [])

    async function refreshEnfermeiros() {
        enfermeiroService.retrieveAllEnfermeiros()
            .then(
                response => {
                    setEnfermeiros(response.data)
                }

            )
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        const results = enfermeiros.filter(enfermeiro=> enfermeiro.nome.toLowerCase().indexOf(search) !== -1 );
        props.setEnfermeiros(results);
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

export default PesquisaEnfermeiros;