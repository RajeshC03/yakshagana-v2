package com.yakshagana.controller;
import com.yakshagana.model.*; import com.yakshagana.repository.*;
import com.yakshagana.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/auth") @CrossOrigin(origins="*")
public class AuthController {
    @Autowired private UserRepository ur; @Autowired private OrganizerRepository or;
    @Autowired private PasswordEncoder pe; @Autowired private JwtUtil jwt;
    @PostMapping("/user/register") public ResponseEntity<?> userReg(@RequestBody Map<String,String> b) {
        if(ur.existsByEmail(b.get("email"))) return bad("Email already registered. Please login.");
        User u=new User(); u.setName(b.get("name")); u.setEmail(b.get("email"));
        u.setPassword(pe.encode(b.get("password"))); u.setPhone(b.getOrDefault("phone",""));
        u.setDistrict(b.getOrDefault("district","")); u.setRole("USER"); ur.save(u);
        return ok(jwt.generateToken(u.getEmail(),"USER"),u.getName(),"",u.getEmail(),"USER","Welcome "+u.getName()+"!");
    }
    @PostMapping("/user/login") public ResponseEntity<?> userLogin(@RequestBody Map<String,String> b) {
        User u=ur.findByEmail(b.get("email")).orElse(null);
        if(u==null) return ResponseEntity.status(401).body(Map.of("message","No account found. Please register."));
        if(!pe.matches(b.get("password"),u.getPassword())) return ResponseEntity.status(401).body(Map.of("message","Incorrect password."));
        return ok(jwt.generateToken(u.getEmail(),"USER"),u.getName(),"",u.getEmail(),"USER","Welcome back "+u.getName()+"!");
    }
    @PostMapping("/organizer/register") public ResponseEntity<?> orgReg(@RequestBody Map<String,String> b) {
        if(or.existsByEmail(b.get("email"))) return bad("Email already registered. Please login.");
        Organizer o=new Organizer(); o.setName(b.get("name")); o.setMelaName(b.get("melaName"));
        o.setEmail(b.get("email")); o.setPassword(pe.encode(b.get("password")));
        o.setPhone(b.getOrDefault("phone","")); o.setRegion(b.getOrDefault("region","")); o.setRole("ORGANIZER"); or.save(o);
        return ok(jwt.generateToken(o.getEmail(),"ORGANIZER"),o.getName(),o.getMelaName(),o.getEmail(),"ORGANIZER","Welcome "+o.getName()+"!");
    }
    @PostMapping("/organizer/login") public ResponseEntity<?> orgLogin(@RequestBody Map<String,String> b) {
        Organizer o=or.findByEmail(b.get("email")).orElse(null);
        if(o==null) return ResponseEntity.status(401).body(Map.of("message","No account found. Please register."));
        if(!pe.matches(b.get("password"),o.getPassword())) return ResponseEntity.status(401).body(Map.of("message","Incorrect password."));
        return ok(jwt.generateToken(o.getEmail(),"ORGANIZER"),o.getName(),o.getMelaName(),o.getEmail(),"ORGANIZER","Welcome back "+o.getName()+"!");
    }
    private ResponseEntity<?> ok(String tok,String name,String mela,String email,String role,String msg) {
        Map<String,Object> r=new HashMap<>(); r.put("token",tok); r.put("name",name);
        r.put("melaName",mela); r.put("email",email); r.put("role",role); r.put("message",msg);
        return ResponseEntity.ok(r);
    }
    private ResponseEntity<?> bad(String msg) { return ResponseEntity.badRequest().body(Map.of("message",msg)); }
}
