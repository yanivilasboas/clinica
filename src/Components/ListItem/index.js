import styles from '../ListItem/styles.module.scss'
import { Row, Col } from 'react-bootstrap';

function ListItem(props) {
    return (
        <div className={styles.listagem}>
            <Row>
  
                <Col md={12}>
                    <h1 class="text-center"><b> {props.nome}</b></h1>
                </Col>
            </Row>

        </div>
    );
}

export default ListItem;