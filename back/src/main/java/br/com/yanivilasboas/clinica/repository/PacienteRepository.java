package br.com.yanivilasboas.clinica.repository;

import br.com.yanivilasboas.clinica.domain.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, String> {
}
