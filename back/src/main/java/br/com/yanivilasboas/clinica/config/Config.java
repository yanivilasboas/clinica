package br.com.yanivilasboas.clinica.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class Config {
    public static String secret;
    public static String salt;
    public static String expirateToken;

    @Autowired
    public Config(Environment env) {
        secret = env.getProperty("app.auth.tokenSecret");
        expirateToken = env.getProperty("app.auth.tokenExpirationMsec");
        salt = env.getProperty("app.auth.salt");
    }

}
