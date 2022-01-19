package br.com.yanivilasboas.clinica.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class Enfermeiro {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idEnfermeiro;

    private String nome;

    private String cpf;

    private String email;

    private String senha;

}
