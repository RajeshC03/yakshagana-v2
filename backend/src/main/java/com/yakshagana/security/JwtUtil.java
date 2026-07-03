package com.yakshagana.security;
import io.jsonwebtoken.*; import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key; import java.util.Date;
@Component public class JwtUtil {
    private static final String SECRET = "YakshaganaPortalSecretKey2026KarnatakaLivingTheatreArtFormCoastal!@#$";
    private static final long EXP = 86400000L;
    private Key key() { return Keys.hmacShaKeyFor(SECRET.getBytes()); }
    public String generateToken(String email, String role) {
        return Jwts.builder().setSubject(email).claim("role",role)
            .setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis()+EXP))
            .signWith(key(), SignatureAlgorithm.HS256).compact();
    }
    public String extractEmail(String t) { return claims(t).getSubject(); }
    public String extractRole(String t)  { return (String) claims(t).get("role"); }
    public boolean validate(String t)    { try { claims(t); return true; } catch(Exception e){ return false; } }
    private Claims claims(String t) {
        return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(t).getBody();
    }
}
