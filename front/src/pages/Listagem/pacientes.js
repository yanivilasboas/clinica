import styles from '../Listagem/styles.module.scss'
import ListItem from '../../Components/ListItem';
import pacienteService from "../../services/pacienteService";
import PesquisaPacientes from '../../Components/PesquisaPacientes';
import { fetchEstados } from '../../Auxiliares/ibge';
import { Form, Input, message, Button } from 'antd';
import { Modal } from "react-bootstrap";
import { Header } from '../../Components/Header';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';


export default function Pacientes() {

    const [ativo, setAtivo] = useState(false);
    const [ativoAtualizar, setAtivoAtualizar] = useState(false);
    const [ativoConfirmar, setAtivoConfirmar] = useState(false);
    const handleClose = () => setAtivo(false);
    const handleCloseAtualizar = () => setAtivoAtualizar(false);
    const handleCloseConfirmar = () => setAtivoConfirmar(false);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState([]);

    const [estados, setEstados] = useState([]);

    useEffect(() => {
        fetchEstados().then((estados) => {
            setEstados(estados);
        }
        );
    }, []);

    useEffect(() => {
        refreshPacientes();
        return () => {
        }
    }, [])

    const [form] = Form.useForm();

    const onFinish = (values) => {

        handleCloseAtualizar();
        form.resetFields();

        values.cpf = paciente;


        if (values.altura == null) {
            values.altura = paciente.altura;
        }

        if (values.data_nascimento == null) {
            values.data_nascimento = paciente.data_nascimento;
        }

        if (values.nome == null) {
            values.nome = paciente.nome;
        }

        if (values.peso == null) {
            values.peso = paciente.peso;
        }

        if (values.uf == null) {
            values.uf = paciente.uf;
        }

        pacienteService.updatePacientes(values).then(() => {
            refreshPacientes();
            message.success("Cadastro Atualizado com sucesso!")
        })
            .catch((error) => {
                message.error("Cadastro não atualizado!")
            });
    }

    const excluirCadastro = (values) => {

        handleCloseConfirmar();
        pacienteService.deletePaciente(values.idPaciente).then(() => {
            refreshPacientes();
            message.success("Cadastro apagado com sucesso!")
        })
            .catch((error) => {
                message.error("Cadastro não excluído!")
            });

    }

    function confirmar(paciente) {
        handleCloseAtualizar()
        setAtivoConfirmar(true)
        setPaciente(paciente)
    }


    async function refreshPacientes() {
        pacienteService.retrieveAllPacientes()
            .then(
                response => {
                    setPacientes(response.data);
                }
            )

    }

    function chamarPagina(paciente) {
        setAtivo(true)
        setPaciente(paciente)
    }

    function chamarPaginaAtualizar(paciente) {
        handleClose()
        setAtivoAtualizar(true)
        setPaciente(paciente)
    }
    const formatarData = (date) => {

        const data = new Date(date);
        const dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        return dataFormatada;
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
                        Certeza que deseja excluir o cadastro de <b>{paciente.nome}</b> agora?
                    </h4>
                    <br />

                </Modal.Body>
                <div className={styles.confirmar}>
                    <Modal.Footer>
                        <Button className={styles.btnNao} onClick={handleCloseConfirmar}
                        >
                            Não
                        </Button>

                        <Button className={styles.btnSim} onClick={() => excluirCadastro(paciente)}>
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

                        {paciente.nome}

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-left">

                    <Row>
                        <Col md={4} className={styles.separador}>
                            <h6 className={styles.campo}>Nome: </h6>
                            <p>{paciente.nome}</p>
                        </Col>

                        <Col md={1} className={styles.separador}>
                            <h6 className={styles.campo}>UF: </h6>
                            <p>{paciente.uf}</p>
                        </Col>

                        <Col md={3} className={styles.separador}>
                            <h6 className={styles.campo}>Data de Nascimento: </h6>
                            <p>{formatarData(paciente.data_nascimento)}</p>
                        </Col>

                        <Col md={2} className={styles.separador}>
                            <h6 className={styles.campo}>Peso: </h6>
                            <p>{paciente.peso} KG</p>
                        </Col>

                        <Col md={2} className={styles.separador}>
                            <h6 className={styles.campo}>Altura: </h6>
                            <p>{paciente.altura} metros</p>
                        </Col>


                        <div className={styles.atualizar}>
                            <Button class="btn btn-success" md={4} onClick={() => chamarPaginaAtualizar(paciente)}>Atualizar Dados</Button>
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

                        {paciente.nome} - Atualizar Dados

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-left">

                    <Form form={form}
                        layout="vertical" className={styles.stepsForm} onFinish={onFinish}>

                        <div className={styles.fieldsContainer}>

                            <Row className={styles.fields}>

                                <Col md={10} className={styles.field}>
                                    <Form.Item
                                        label="Nome:"
                                        name="nome"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Insira o nome completo',
                                            },
                                        ]}>
                                        <p>{paciente.nome}</p>
                                        <Input placeholder="Insira o nome completo" />
                                    </Form.Item>
                                </Col>



                                <Col md={2} className={styles.field}>
                                    <Form.Item
                                        label="UF:"
                                        htmlFor="estado"
                                        name="uf"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Selecione a UF',
                                            },

                                        ]}>
                                        <p>{paciente.uf}</p>
                                        <select>
                                            <option value="" disabled> Selecione a UF</option>
                                            {estados.map((estado) => {
                                                const { sigla, nome } = estado;
                                                return (
                                                    <option key={sigla} value={sigla}>{sigla} - {nome}</option>
                                                );
                                            })}
                                        </select>

                                    </Form.Item>
                                </Col>

                                <Col md={4} className={styles.field}>
                                    <Form.Item
                                        label="Data de Nascimento:"
                                        name="data_nascimento"
                                    >
                                        <p>{formatarData(paciente.data_nascimento)}</p>
                                        <Input type="date" />
                                    </Form.Item>
                                </Col>

                                <Col md={4} className={styles.field}>
                                    <Form.Item
                                        label="Peso:"
                                        name="peso"
                                    >
                                        <p>{paciente.peso}</p>
                                        <Input placeholder="Ex: 54.5" />
                                    </Form.Item>
                                </Col>

                                <Col md={4} className={styles.field}>
                                    <Form.Item
                                        label="Altura:"
                                        name="altura"
                                    >
                                        <p>{paciente.altura}</p>
                                        <Input placeholder="Ex: 1.56" />
                                    </Form.Item>
                                </Col>

                                <Col md={11} >
                                    <button className={styles.buttonSubmit} type="submit" >
                                        Salvar
                                    </button>
                                </Col>
                                <Col md={1}>
                                    <Button className={styles.buttonExcluir} onClick={() => confirmar(paciente)} type="submit">
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
                <PesquisaPacientes setPacientes={setPacientes} />
                <Row>

                    <div className={styles.itens}>
                        {pacientes.map(paciente => {
                            return (
                                <Col md={4} onClick={() => chamarPagina(paciente)}>
                                    <ListItem
                                        key={paciente.cpf}
                                        nome={paciente.nome}

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