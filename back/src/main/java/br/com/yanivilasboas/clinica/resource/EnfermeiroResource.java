package br.com.yanivilasboas.clinica.resource;

import br.com.yanivilasboas.clinica.config.Config;
import br.com.yanivilasboas.clinica.domain.Enfermeiro;
import br.com.yanivilasboas.clinica.domain.Medico;
import br.com.yanivilasboas.clinica.repository.EnfermeiroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/publico/enfermeiros")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor

public class EnfermeiroResource {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private EnfermeiroRepository enfermeiroRepository;

    @GetMapping
    public List<Enfermeiro> listarTodos(){
        return enfermeiroRepository.findAll();
    }

    @GetMapping("/{idEnfermeiro}")
    public Enfermeiro buscarPeloId(@PathVariable Long idEnfermeiro) {

        return enfermeiroRepository.findById(idEnfermeiro).orElse(null);
    }

    @DeleteMapping("/{idEnfermeiro}")
    public void remover(@PathVariable Long idEnfermeiro) {
        enfermeiroRepository.deleteById(idEnfermeiro);
    }

    @PostMapping
    public Enfermeiro cadastrar(@RequestBody Enfermeiro enfermeiro ){

        enfermeiro.setCpf(passwordEncoder.encode(enfermeiro.getCpf() + Config.salt));
        enfermeiro.setSenha(passwordEncoder.encode(enfermeiro.getSenha() + Config.salt));
        return enfermeiroRepository.save(enfermeiro);
    }
}
