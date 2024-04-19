/**
 * The User Service class is responsible for handling user registration, login, and logout.
 * It implements the UserDetailsService interface to provide user details for authentication.
 *
 * @author Justin Swinney
 * @version 1.0
 *
 * */
package org.grazioso.rescueacademybackend.service;

import org.grazioso.rescueacademybackend.dto.AuthenticationRequest;
import org.grazioso.rescueacademybackend.dto.AuthenticationResponse;
import org.grazioso.rescueacademybackend.model.User;
import org.grazioso.rescueacademybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Load user details from database by username. This method is called by the Spring Security framework when a user attempts to log in.
    // It retrieves the user from the database based on the provided username, and returns a UserDetails object that contains the user's username, password, and roles.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                user.getRoles().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
    }

    // Register a new user with sign up request body (username, password, email) checks if  user already exists in database.
    // If user exists, return false, otherwise, save user to database and return true.
    public AuthenticationResponse.UserRegistrationResponse registerUser(AuthenticationRequest.RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.username())) {
            return new AuthenticationResponse.UserRegistrationResponse(false, "Username is already taken!");
        }
        if (userRepository.existsByEmail(registerRequest.email())) {
            return new AuthenticationResponse.UserRegistrationResponse(false, "Email is already in use!");
        }
        User user = new User(registerRequest.username(), passwordEncoder.encode(registerRequest.password()), registerRequest.email(), Collections.singleton("ROLE_USER"));
        userRepository.save(user);
        return new AuthenticationResponse.UserRegistrationResponse(true, "User Registration successfully completed");
    }
}
