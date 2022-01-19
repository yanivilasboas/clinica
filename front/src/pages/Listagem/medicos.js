import styles from '../Listagem/styles.module.scss'
import ListItem from '../../Components/ListItem';
import PesquisaMedicos from '../../Components/PesquisaMedicos';
import { Modal } from "react-bootstrap";
import { Header } from '../../Components/Header';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import medicoService from '../../services/medicoService';


export default function Medicos() {

    const [ativo, setAtivo] = useState(false);
    const handleClose = () => setAtivo(false);
    const [medico, setMedico] = useState([]);
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
                    setMedicos(response.data);
                }
            )

    }

    function chamarPagina(medico) {
        setAtivo(true)
        setMedico(medico)
    }


    return (
        <div className={styles.wrapper}>

            <Modal
                id="modCome" show={ativo} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName={styles.Modal}
                centered>
                <Modal.Header closeButton onClick={handleClose} className={styles.titulo}>
                    <Modal.Title>

                        {medico.nome}

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-left">

                    <Row>
                        <Col md={8} className={styles.separador}>
                            <h6 className={styles.campo}>Nome: </h6>
                            <p>{medico.nome}</p>
                        </Col>

                        <Col md={4} className={styles.separador}>
                            <h6 className={styles.campo}>Email: </h6>
                            <p>{medico.email}</p>
                        </Col>

                    </Row>

                </Modal.Body>
            </Modal>

            <Header />
            <main className={styles.ListagemContainer}>
                <header className={styles.topo}>
                    <h1 className={styles.titulo}>Clínica Vilas Boas</h1>
                </header>
                <PesquisaMedicos setMedicos={setMedicos} />
                <Row>

                    <div className={styles.itens}>
                        {medicos.map(medico => {
                            return (
                                <Col md={4} onClick={() => chamarPagina(medico)}>
                                    <ListItem
                                        key={medico.idMedico}
                                        nome={medico.nome}

                                    />
                                </Col>
                            )
                        })}
                    </div>

                </Row>
            </main>
        </div>
    );
}