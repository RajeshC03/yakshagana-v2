package com.yakshagana.config;
import com.yakshagana.security.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod; import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration @EnableWebSecurity public class SecurityConfig {
    @Autowired private JwtFilter jwtFilter;
    @Bean public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
    @Bean public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(c->c.disable())
            .sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(a->a
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET,"/api/shows/**","/api/melas/**","/api/prasangas/**").permitAll()
                .requestMatchers("/ws/**").permitAll()
                .requestMatchers(HttpMethod.POST,"/api/shows/**").hasRole("ORGANIZER")
                .requestMatchers(HttpMethod.PUT,"/api/shows/**").hasRole("ORGANIZER")
                .requestMatchers(HttpMethod.DELETE,"/api/shows/**").hasRole("ORGANIZER")
                .anyRequest().authenticated())
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
