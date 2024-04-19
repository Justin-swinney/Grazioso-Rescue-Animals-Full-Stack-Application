/**
 * The User Controller is responsible for handling HTTP request from the front end and directing the request to the appropriate service class (Authentication Service or User Service).
 * This controller will handel the creation of new users, login of existing users as well as logging out users.
 *
 * @author Justin Swinney
 * @version 1.0
 *
 * */
package org.grazioso.rescueacademybackend.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.grazioso.rescueacademybackend.dto.AuthenticationRequest;
import org.grazioso.rescueacademybackend.dto.AuthenticationResponse;
import org.grazioso.rescueacademybackend.security.JwtTokenProvider;
import org.grazioso.rescueacademybackend.service.AuthenticationService;
import org.grazioso.rescueacademybackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200") //http://localhost:4200 https://rescueanimalacademy.com
public class UserController {

    private final AuthenticationService authenticationService;

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public UserController(AuthenticationService authenticationService, UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // POST handle login request from front end and authenticate user.
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthenticationRequest.LoginRequest loginRequest, HttpServletResponse httpServletResponse) {
        String jwt = authenticationService.authenticateUser(loginRequest);
        long jwtExpiration = jwtTokenProvider.getJwtExpiration();
        ResponseCookie jwtCookie = ResponseCookie.from("jwt", jwt)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(jwtExpiration / 1000)
                .sameSite("None")
                .build();
        httpServletResponse.addHeader("set-Cookie", jwtCookie.toString());
        return ResponseEntity.ok(new AuthenticationResponse.JwtAuthenticationResponse(jwt));
    }

    // POST handle request for registration of new user.
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody AuthenticationRequest.RegisterRequest signUpRequest) {
        AuthenticationResponse.UserRegistrationResponse userRegistrationResponse = userService.registerUser(signUpRequest);
        if (userRegistrationResponse.isRegistered()) {
            return ResponseEntity.ok(userRegistrationResponse);
        } else {
            return ResponseEntity.badRequest().body(userRegistrationResponse);
        }
    }

    // POST handle logout request of user.
    @PostMapping("/logout")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Successfully logged out");
    }
}