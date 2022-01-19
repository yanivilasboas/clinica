package br.com.yanivilasboas.clinica.security;

import br.com.yanivilasboas.clinica.domain.Medico;
import br.com.yanivilasboas.clinica.exception.ResourceNotFoundException;
import br.com.yanivilasboas.clinica.repository.MedicoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MedicoRepository medicoRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String login)
            throws UsernameNotFoundException {
        Medico user = medicoRepository.findByEmail(login)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Não há usuario com esse login : " + login)
        );

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        Medico user = medicoRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("User", "id", id)
        );

        return UserPrincipal.create(user);
    }
}