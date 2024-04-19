/**
 * The Authentication Request class contains nested record classes that create simple data structure for
 * login and signup requests. These classes are used to create a JSON object that can be parsed by the
 * AuthenticationController class.
 *
 * @author Justin Swinney
 * @version 1.0
 *
 * */
package org.grazioso.rescueacademybackend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthenticationRequest {
    public record LoginRequest(@NotBlank @Size(min = 6, max = 20) String username, @NotBlank @Size(min = 8, max = 35) String password) {}
    public record RegisterRequest(@NotBlank @Size(min = 6, max = 20)  String username, @NotBlank @Size(min = 8, max = 35) String password, @NotBlank @Email String email) {}
}