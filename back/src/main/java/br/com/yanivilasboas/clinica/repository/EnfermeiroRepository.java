package br.com.yanivilasboas.clinica.repository;

import br.com.yanivilasboas.clinica.domain.Enfermeiro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnfermeiroRepository  extends JpaRepository<Enfermeiro, Long> {
}
