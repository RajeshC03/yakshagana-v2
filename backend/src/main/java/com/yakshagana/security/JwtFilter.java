package com.yakshagana.security;
import com.yakshagana.repository.*; import jakarta.servlet.*; import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component; import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException; import java.util.List;
@Component public class JwtFilter extends OncePerRequestFilter {
    @Autowired private JwtUtil jwt;
    @Autowired private UserRepository users;
    @Autowired private OrganizerRepository orgs;
    @Override protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {
        String h = req.getHeader("Authorization");
        if(h != null && h.startsWith("Bearer ")) {
            String token = h.substring(7);
            if(jwt.validate(token)) {
                String email = jwt.extractEmail(token);
                String role  = jwt.extractRole(token);
                Object p = "ORGANIZER".equals(role) ? orgs.findByEmail(email).orElse(null) : users.findByEmail(email).orElse(null);
                if(p != null)
                    SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(p, null, List.of(new SimpleGrantedAuthority("ROLE_"+role))));
            }
        }
        chain.doFilter(req,res);
    }
}
