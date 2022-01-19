package br.com.yanivilasboas.clinica.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    private String login;

    private String senha;

}
