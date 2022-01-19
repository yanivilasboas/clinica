package br.com.yanivilasboas.clinica.resource;

import br.com.yanivilasboas.clinica.domain.Dashboard;
import br.com.yanivilasboas.clinica.domain.Enfermeiro;
import br.com.yanivilasboas.clinica.repository.EnfermeiroRepository;
import br.com.yanivilasboas.clinica.repository.MedicoRepository;
import br.com.yanivilasboas.clinica.repository.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/publico/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class DashboardResource {

    private final PacienteRepository pacienteRepository;
    private final EnfermeiroRepository enfermeiroRepository;
    private final MedicoRepository medicoRepository;


    @PostMapping
    public ResponseEntity<Dashboard> filtro() {

        Dashboard dashboard = new Dashboard();

        dashboard.setQtdPacientes(pacienteRepository.count());
        dashboard.setQtdEnfermeiros(enfermeiroRepository.count());
        dashboard.setQtdMedicos(medicoRepository.count());

        return ResponseEntity.ok(dashboard);
    }
}
