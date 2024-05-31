package authorization;

import exceptions.AuthenticationException;
import exceptions.RegisterConflictException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import models.User;
import services.UserService;
import utils.KeyGenerator;
import utils.PasswordEncryptor;

import java.security.NoSuchAlgorithmException;
import java.util.Date;

public class AuthorizationService {

    private static final String SECRET_KEY = KeyGenerator.getInstance().getSecretKey();
    private static final long JWT_EXPIRATION_TIME = 3600000;//1 hour

    public static void saveUser (RegisterRequest registerRequest) throws RegisterConflictException, NoSuchAlgorithmException {

        User checkIfUserExists = UserService.findUserByEmail(registerRequest.getEmail());

        if (checkIfUserExists == null) {
            User user = new User();
            user.setNrMat(registerRequest.getNrMat());
            user.setEmail(registerRequest.getEmail());
            user.setNumeFam(registerRequest.getNumeFam());
            user.setPrenume(registerRequest.getPrenume());
            user.setParola(PasswordEncryptor.encryptPassword(registerRequest.getPassword()));
            user.setRole(registerRequest.getRole());
            UserService.saveUser(user);
        } else {
            throw new RegisterConflictException("An user with the specified email already exists!");
        }
    }

    public static AuthorizationToken authenticate(AuthenticationRequest authenticationRequest) throws AuthenticationException, NoSuchAlgorithmException {

        User user = UserService.findUserByEmail(authenticationRequest.getEmail());

        if (user != null) {
            if (PasswordEncryptor.passwordMatch(authenticationRequest.getPassword(), user.getParola())) {
                return new AuthorizationToken(generateJwtToken(user));
            } else {
                throw new AuthenticationException("Bad Credentials");
            }

        } else {
            throw new AuthenticationException("User not registered");
        }
    }

    private static String generateJwtToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION_TIME);

        Claims claims = Jwts.claims();
        claims.put("id",String.valueOf(user.getId()));
        claims.put("email", user.getEmail());
        claims.put("role", user.getRole());
        claims.put("firstName", user.getPrenume());
        claims.put("lastName", user.getNumeFam());


        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }
}
