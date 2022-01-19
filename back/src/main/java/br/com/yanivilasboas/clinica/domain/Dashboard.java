package br.com.yanivilasboas.clinica.domain;


import lombok.Data;

@Data
public class Dashboard {

    private Long qtdEnfermeiros;
    private Long qtdMedicos;
    private Long qtdPacientes;
}
