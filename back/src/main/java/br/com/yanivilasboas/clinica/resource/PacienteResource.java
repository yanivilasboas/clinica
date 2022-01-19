package br.com.yanivilasboas.clinica.resource;

import br.com.yanivilasboas.clinica.domain.Paciente;
import br.com.yanivilasboas.clinica.config.Config;
import br.com.yanivilasboas.clinica.repository.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publico/pacientes")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class  PacienteResource {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping
    public List<Paciente> listarTodos(){
        return pacienteRepository.findAll();
    }

    @GetMapping("/{cpf}")
    public Paciente buscarpeloId(@PathVariable String cpf) {
        return pacienteRepository.findById(cpf).orElse(null);
    }

    @DeleteMapping("/{cpf}")
    public void remover(@PathVariable String cpf) {


        pacienteRepository.deleteById(cpf);
    }

    @PostMapping
    public Paciente cadastrar(@RequestBody Paciente paciente ){


        return pacienteRepository.save(paciente);
    }

    @PutMapping
    public Paciente atualizar(@RequestBody Paciente paciente) {
        return pacienteRepository.save(paciente);
    }
}
