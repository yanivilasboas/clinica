package br.com.yanivilasboas.clinica.security;

import br.com.yanivilasboas.clinica.domain.Medico;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class UserPrincipal implements UserDetails {

    private Long id;
    private String email;
    private String cpfCnpj;
    private String senha;
    private boolean ativo;
    private Medico medico;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public UserPrincipal(Long id, String email,String senha, String cpfCnpj,Medico medico, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.authorities = authorities;
        this.cpfCnpj = cpfCnpj;
        this.medico = medico;
        this.senha = senha;
    }

    public static UserPrincipal create(Medico user) {

        List<GrantedAuthority> authorities;

        authorities = Collections.
                singletonList(new SimpleGrantedAuthority("ROLE_USER"));

        return new UserPrincipal(
                user.getIdMedico(),
                user.getEmail(),
                user.getSenha(),
                user.getCpf(),
                user,
                authorities
        );
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Medico getUMedico() {
        return medico;
    }

}
