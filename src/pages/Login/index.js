import styles from '../Login/styles.module.scss'

import { Row, Col } from 'react-bootstrap';
import { Form, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useState } from 'react';
import { Modal } from "react-bootstrap";
import { Button } from 'antd';
import { history } from '../../history';
import LoginService from '../../services/loginService';
import { ACCESS_TOKEN } from '../../services/constantes';

export default function Login({ setUsuarioLogado }) {
  const [ativo, setAtivo] = useState(false);
  const handleClose = () => setAtivo(false);

  function chamarPagina() {
    setAtivo(true)
  }
  const onFinish = (values) => {

    LoginService
      .login({ login: values.email, senha: values.senha })
      .then(resp => {
        console.log(resp)
        localStorage.setItem(ACCESS_TOKEN, resp.accessToken);
        // setUsuarioLogado(true);
        message.success('Login realizado com sucesso!');
        history.push('/home');
        window.location.href = '/home';
      })
      .catch(error => {
        message.error('Usuario ou senha inválidos');
      });
  }

  return (
    <div classsName={styles.wrapper}>
      <main className={styles.App} >

        <div className={styles.topo}>
          <img src="/iconClinica.png" alt="icon" />

          <Form className={styles.stepsForm} onFinish={onFinish}>
            <h1> Login </h1>
            <div className={styles.fieldsContainer}>

              <Row className={styles.fields}>
                <Col md={12} className={styles.field}>
                  <Form.Item
                    label="Email:"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Insira o email',
                      },
                    ]}>

                    <Input placeholder="Insira o email" />
                  </Form.Item>
                </Col>

                <Col md={12} className={styles.field}>
                  <Form.Item
                    label="Senha:"
                    name="senha"
                    rules={[
                      {
                        required: true,
                        message: 'Insira a senha',
                      },
                    ]}>
                    <Input.Password
                      placeholder="Insira a senha"
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                </Col>


                <button className={styles.buttonSubmit} type="submit">
                  Entrar
                </button>

              </Row>
            </div>
          </Form>
  
        </div>
    </main>
    </div >
  );
}