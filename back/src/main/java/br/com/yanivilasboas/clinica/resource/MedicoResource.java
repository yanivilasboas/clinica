package br.com.yanivilasboas.clinica.resource;


import br.com.yanivilasboas.clinica.config.Config;
import br.com.yanivilasboas.clinica.domain.Medico;
import br.com.yanivilasboas.clinica.domain.Paciente;
import br.com.yanivilasboas.clinica.repository.MedicoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publico/medicos")
@RequiredArgsConstructor
public class MedicoResource {

	private final PasswordEncoder passwordEncoder;

	@Autowired
	private MedicoRepository medicoRepository;
	
	@GetMapping
	public List<Medico> listarTodos(){
		return medicoRepository.findAll();
	}
	
	@GetMapping("/{idMedico}")
	public Medico buscarPeloId(@PathVariable Long idMedico) {
		return medicoRepository.findById(idMedico).orElse(null);
	}
	
	@DeleteMapping("/{idMedico}")
	public void remover(@PathVariable Long idMedico) {
		medicoRepository.deleteById(idMedico);
	}


}
