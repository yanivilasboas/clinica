import "antd/dist/antd.css"
import styles from '../Paciente/styles.module.scss'
import React from 'react';

import { useEffect, useState } from "react";
import { Row, Col } from 'react-bootstrap';

import { Form, message, Input, Select } from 'antd';
import InputMask from "react-input-mask";
import { Header } from '../../Components/Header';

import { fetchEstados } from '../../Auxiliares/ibge';

import PacienteService from "../../services/pacienteService";

const InputCPF = (props) => (
  <InputMask mask="999.999.999-99"
    value={props.value}
    onChange={props.onChange}
    placeholder="Insira o número do CPF" />
);

const { Option } = Select;

export function Paciente(props) {

  const [estados, setEstados] = useState([]);

    useEffect(() => {
        fetchEstados().then((estados) => {
            setEstados(estados);
        }
        );
    }, []);

  const [form] = Form.useForm();

  const onFinish = (values) => {

    form.resetFields();

    PacienteService.savePaciente(values).then(() => {
      message.success("Paciente cadastrado com sucesso!")
    })
      .catch((error) => {
        message.error("Cadastro não foi concluído!")
      });
  }

  return (
    <div className={styles.wrapper}>

      <Header />

      <main className={styles.App}>
        <h1>Cadastrar Paciente</h1>

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

              <Col md={3} className={styles.field}>
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
                  <select>
            <option value="" disabled> Selecione a UF</option>
            {estados.map((estado) => {
                const { sigla, nome} = estado;
                return (
                    <option  key={sigla} value={sigla}>{sigla} - {nome}</option>
                );
            })}
        </select>

                </Form.Item>
              </Col>

              <Col md={3} className={styles.field}>
                <Form.Item
                  label="Data de Nascimento:"
                  name="data_nascimento"
                >
                  <Input type="date" />
                </Form.Item>
              </Col>

              <Col md={3} className={styles.field}>
                <Form.Item
                  label="Peso:"
                  name="peso"
                >
                  <Input placeholder="Ex: 54.5" />
                </Form.Item>
              </Col>

              <Col md={3} className={styles.field}>
                <Form.Item
                  label="Altura:"
                  name="altura"
                >
                  <Input placeholder="Ex: 1.56" />
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
