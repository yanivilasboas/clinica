package br.com.yanivilasboas.clinica.domain;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Data
public class Paciente {

    @Id
    private String cpf;

    private String nome;

    private LocalDate data_nascimento;

    private Double peso;

    private Double altura;

    private String uf;
}
