import styles from '../Listagem/styles.module.scss'
import ListItem from '../../Components/ListItem';
import enfermeiroService from "../../services/enfermeiroService";
import PesquisaEnfermeiros from '../../Components/PesquisaEnfermeiros';
import { Form, Input, message, Button } from 'antd';
import { Modal } from "react-bootstrap";
import { Header } from '../../Components/Header';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';


export default function Enfermeiros() {

    const [ativo, setAtivo] = useState(false);
    const [ativoAtualizar, setAtivoAtualizar] = useState(false);
    const [ativoConfirmar, setAtivoConfirmar] = useState(false);
    const handleClose = () => setAtivo(false);
    const handleCloseAtualizar = () => setAtivoAtualizar(false);
    const handleCloseConfirmar = () => setAtivoConfirmar(false);
    const [enfermeiro, setEnfermeiro] = useState([]);
    const [enfermeiros, setEnfermeiros] = useState([]);

    useEffect(() => {
        refreshEnfermeiros();
        return () => {
        }
    }, [])

    const [form] = Form.useForm();

    const onFinish = (values) => {

        handleCloseAtualizar();
        form.resetFields();

        values.idEnfermeiro = enfermeiro;

        values.senha = enfermeiro.senha;
        values.cpf = enfermeiro.cpf;


        if (values.nome == null) {
            values.nome = enfermeiro.nome;
        }

        if (values.email == null) {
            values.email = enfermeiro.email;
        }

        enfermeiroService.updateEnfermeiro(values).then(() => {
            refreshEnfermeiros();
            message.success("Cadastro Atualizado com sucesso!")
        })
            .catch((error) => {
                message.error("Cadastro não atualizado!")
            });
    }

    const excluirCadastro = (values) => {

        handleCloseConfirmar();
        enfermeiroService.deleteEnfermeiro(values.idEnfermeiro).then(() => {
            refreshEnfermeiros();
            message.success("Cadastro apagado com sucesso!")
        })
            .catch((error) => {
                message.error("Cadastro não excluído!")
            });

    }

    function confirmar(enfermeiro) {
        handleCloseAtualizar()
        setAtivoConfirmar(true)
        setEnfermeiro(enfermeiro)
    }


    async function refreshEnfermeiros() {
        enfermeiroService.retrieveAllEnfermeiros()
            .then(
                response => {
                    setEnfermeiros(response.data);
                }
            )

    }

    function chamarPagina(enfermeiro) {
        setAtivo(true)
        setEnfermeiro(enfermeiro)
    }

    function chamarPaginaAtualizar(enfermeiro) {
        handleClose()
        setAtivoAtualizar(true)
        setEnfermeiro(enfermeiro)
    }

    return (
        <div className={styles.wrapper}>
            <Modal
                id="modCome" show={ativoConfirmar} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName={styles.ModalConfirmar}
                centered>
                <Modal.Header closeButton onClick={handleCloseConfirmar} className={styles.titulo}>
                    <Modal.Title>
                        Confirmar Exclusão

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-left">
                    <h4>
                        Certeza que deseja excluir o cadastro de <b>{enfermeiro.nome}</b> agora?
                    </h4>
                    <br />

                </Modal.Body>
                <div className={styles.confirmar}>
                    <Modal.Footer>
                        <Button className={styles.btnNao} onClick={handleCloseConfirmar}
                        >
                            Não
                        </Button>

                        <Button className={styles.btnSim} onClick={() => excluirCadastro(enfermeiro)}>
                            Sim
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>

            <Modal
                id="modCome" show={ativo} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName={styles.Modal}
                centered>
                <Modal.Header closeButton onClick={handleClose} className={styles.titulo}>
                    <Modal.Title>

                        {enfermeiro.nome}

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-left">

                    <Row>
                        <Col md={8} className={styles.separador}>
                            <h6 className={styles.campo}>Nome: </h6>
                            <p>{enfermeiro.nome}</p>
                        </Col>

                        <Col md={4} className={styles.separador}>
                            <h6 className={styles.campo}>Email: </h6>
                            <p>{enfermeiro.email}</p>
                        </Col>


                        <div className={styles.atualizar}>
                            <Button class="btn btn-success" md={4} onClick={() => chamarPaginaAtualizar(enfermeiro)}>Atualizar Dados</Button>
                        </div>

                    </Row>

                </Modal.Body>
            </Modal>

            <Modal
                id="modCome" show={ativoAtualizar} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName={styles.Modal}
                centered>
                <Modal.Header closeButton onClick={handleCloseAtualizar} className={styles.titulo}>
                    <Modal.Title>

                        {enfermeiro.nome} - Atualizar Dados

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-left">

                    <Form form={form}
                        layout="vertical" className={styles.stepsForm} onFinish={onFinish}>

                        <div className={styles.fieldsContainer}>

                            <Row className={styles.fields}>

                                <Col md={7} className={styles.field}>
                                    <Form.Item
                                        label="Nome:"
                                        name="nome"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Insira o nome completo',
                                            },
                                        ]}>
                                        <p>{enfermeiro.nome}</p>
                                        <Input placeholder="Insira o nome completo" />
                                    </Form.Item>
                                </Col>

                                <Col md={5} className={styles.field}>
                                    <Form.Item
                                        label="Email:"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Insira o email',
                                            },
                                        ]}>
                                        <p>{enfermeiro.email}</p>
                                        <Input placeholder="Insira o email" />
                                    </Form.Item>
                                </Col>

                                <Col md={11} >
                                    <button className={styles.buttonSubmit} type="submit" >
                                        Salvar
                                    </button>
                                </Col>
                                <Col md={1}>
                                    <Button className={styles.buttonExcluir} onClick={() => confirmar(enfermeiro)} type="submit">
                                        <img src="/excluir.png" alt="excluir" />
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Form>



                </Modal.Body>
            </Modal>

            <Header />
            <main className={styles.ListagemContainer}>
                <header className={styles.topo}>
                    <h1 className={styles.titulo}>Clínica Vilas Boas</h1>
                </header>
                <PesquisaEnfermeiros setEnfermeiros={setEnfermeiros} />
                <Row>

                    <div className={styles.itens}>
                        {enfermeiros.map(enfermeiro => {
                            return (
                                <Col md={4} onClick={() => chamarPagina(enfermeiro)}>
                                    <ListItem
                                        key={enfermeiro.idEnfermeiro}
                                        nome={enfermeiro.nome}

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