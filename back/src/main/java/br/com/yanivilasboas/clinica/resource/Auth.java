package br.com.yanivilasboas.clinica.resource;

import br.com.yanivilasboas.clinica.config.Config;
import br.com.yanivilasboas.clinica.domain.Medico;
import br.com.yanivilasboas.clinica.payload.AuthResponse;
import br.com.yanivilasboas.clinica.payload.LoginRequest;
import br.com.yanivilasboas.clinica.repository.MedicoRepository;
import br.com.yanivilasboas.clinica.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class Auth {

    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final MedicoRepository medicoRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getLogin(),
                        loginRequest.getSenha() + Config.salt
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.createToken(authentication);

        return ResponseEntity.ok(new AuthResponse(token));

    }

    @PostMapping("/signup")
    public Medico cadastrar(@RequestBody Medico medico ){

        medico.setCpf(passwordEncoder.encode(medico.getCpf() + Config.salt));
        medico.setSenha(passwordEncoder.encode(medico.getSenha() + Config.salt));
        return medicoRepository.save(medico);
    }

}
