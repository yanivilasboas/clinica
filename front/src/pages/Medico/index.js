import "antd/dist/antd.css"
import styles from '../Medico/styles.module.scss'
import React from 'react';

import { Row, Col } from 'react-bootstrap';

import { Form, message, Input, Select } from 'antd';
import InputMask from "react-input-mask";
import { Header } from '../../Components/Header';

import MedicoService from "../../services/medicoService";

const InputCPF = (props) => (
  <InputMask mask="999.999.999-99"
    value={props.value}
    onChange={props.onChange}
    placeholder="Insira o número do CPF" />
);

const { Option } = Select;

export function Medico(props) {

  const [form] = Form.useForm();

  const onFinish = (values) => {

    form.resetFields();

    MedicoService.saveMedico(values).then(() => {
      message.success("Médico cadastrado com sucesso!")
    })
      .catch((error) => {
        message.error("Cadastro não foi concluído!")
      });
  }

  return (
    <div className={styles.wrapper}>

      <Header />

      <main className={styles.App}>
        <h1>Cadastrar Médico</h1>

        <Form form={form}
          layout="vertical" className={styles.stepsForm} onFinish={onFinish}>

          <div className={styles.fieldsContainer}>

            <Row className={styles.fields}>

              <Col md={9} className={styles.field}>
                <Form.Item
                  label="Nome:"
                  name="nome"
                  rules={[
                    {
                      required: true,
                      message: 'Insira o nome completo',
                    },
                  ]}>
                  <Input placeholder="Insira o nome completo" />
                </Form.Item>
              </Col>

              <Col md={3} className={styles.field}>
                <Form.Item
                  label="CPF:"
                  name="cpf"
                  rules={[
                    {
                      required: true,
                      message: 'Insira o nome CPF',
                    },
                  ]}>
                  <InputCPF />
                </Form.Item>
              </Col>

              <Col md={6} className={styles.field}>
                <Form.Item
                  label="Email:"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Insira o endereço de email',
                    },
                  ]}>
                  <Input type="email" placeholder="Insira o endereço de email" />
                </Form.Item>
              </Col>

              <Col md={6} className={styles.field}>
                <Form.Item
                  label="Senha:"
                  name="senha"
                  rules={[
                    {
                      required: true,
                      message: 'Insira a senha',
                    },
                  ]}>
                  <Input type="password" placeholder="Insira a senha" />
                </Form.Item>
              </Col>



              <Col md={12} >
                <button className={styles.buttonSubmit} type="submit" >
                  Salvar
                </button>
              </Col>
            </Row>
          </div>
        </Form>
      </main>
    </div>
  );

}
