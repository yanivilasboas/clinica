import styles from '../Home/styles.module.scss'
import { Header } from '../../Components/Header';
import { Row, Col } from 'react-bootstrap';
import DashboardService from "../../services/dashboardService";

import { useState, useEffect } from "react";



export default function Home() {

    const [dashboard, setDashboard] = useState([]);


    async function refresh() {
        DashboardService.dashboard().then((response) => {
            setDashboard(response.data);
        });
    }

    useEffect(() => {
        refresh();
        return () => { };
    }, []);


    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.homeContainer}>

                <h1 className={styles.titulo}>Clínica Vilas Boas</h1>
                
                <img src="/iconClinica.png" alt="icon" />
                
                <Row className={styles.menu}>

                    <Col md={4} className={styles.itemMenu}>

                        <div class="card  bg-success mb-3" onClick={(event) => { event.preventDefault(); window.open("/enfermeiros"); }}>

                            <div class="card-header"><h4 >Quantidade de Enfermeiros</h4></div>
                            <div class="card-body">
                                <h5>{dashboard.qtdEnfermeiros}</h5>
                            </div>
                        </div>

                    </Col>

                    <Col md={4} className={styles.itemMenu} >

                        <div class="card  bg-success mb-3" onClick={(event) => { event.preventDefault(); window.open("/medicos"); }}>


                            <div class="card-header"><h4 >Quantidade de Médicos</h4></div>
                            <div class="card-body">

                                <h5>{dashboard.qtdMedicos}</h5>
                            </div>
                        </div>

                    </Col>

                    <Col md={4} className={styles.itemMenu} >
                        <div class="card  bg-success mb-3" onClick={(event) => { event.preventDefault(); window.open("/pacientes"); }}>


                            <div class="card-header"><h4 >Quantidade de Pacientes</h4></div>
                            <div class="card-body">

                                <h5>{dashboard.qtdPacientes}</h5>
                            </div>
                        </div>

                    </Col>



                </Row>
            </main>
        </div>
    );
}

