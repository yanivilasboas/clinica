import styles from '../Header/styles.module.scss'
import { Dropdown, SplitButton } from 'react-bootstrap';
import '../../App.css';
import { ACCESS_TOKEN } from '../../services/constantes';
import { Row, Col } from 'react-bootstrap';


export function Header() {

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    
  };


  return (
    <div className={styles.headerContainer}>

      <header onClick={(event) => { event.preventDefault(); window.open("/home");  }}>
        <Row>
          <Col md={2}>
            <img src="/iconClinica.png" alt="icon" />
          </Col>
          <Col md={10}>
            <h3> Clínica <br/> Vilas Boas </h3>
          </Col>

        </Row>
       
      </header>

      <div>
        {['end'].map((direction) => (
          <SplitButton
            key={direction}
            drop={direction}
            title={`Enfermeiros`}
          >
            <div className={styles.item}>
              <Dropdown.Item className={styles.itemMenu} eventKey="1" href="/enfermeiro">Cadastrar</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className={styles.itemMenu} eventKey="2" href="/enfermeiros">Ver Listagem</Dropdown.Item>
            </div>
          </SplitButton>
        ))}
      </div>

      <div>
        {['end'].map((direction) => (
          <SplitButton
            key={direction}
            drop={direction}
            title={`Médicos`}
          >
            <div className={styles.item}>
              <Dropdown.Item className={styles.itemMenu} eventKey="1" href="/medico">Cadastrar</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className={styles.itemMenu} eventKey="2" href="/medicos">Ver listagem</Dropdown.Item>

            </div>
          </SplitButton>
        ))}
      </div>

      <div>
        {['end'].map((direction) => (
          <SplitButton
            key={direction}
            drop={direction}
            title={`Pacientes`}
          >
            <div className={styles.item}>
              <Dropdown.Item className={styles.itemMenu} eventKey="1" href="/paciente">Cadastrar</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className={styles.itemMenu} eventKey="2" href="/pacientes">Ver listagem</Dropdown.Item>

            </div>
          </SplitButton>
        ))}
      </div>

      

      <ul>
        <li className={styles.sair}> <a href="/" onClick={logout}><img src="/sair.png" alt="icon Sair" /></a></li>
      </ul>


    </div>

  );
}