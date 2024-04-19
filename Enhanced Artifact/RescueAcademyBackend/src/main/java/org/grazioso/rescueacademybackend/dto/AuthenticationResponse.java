/**
 * The Authentication Response class contains nested records for the response of the authentication
 * and registration endpoints.
 *
 * @author Justin Swinney
 * @version 1.0
 *
 * */
package org.grazioso.rescueacademybackend.dto;

public class AuthenticationResponse {

    public record JwtAuthenticationResponse(String token) {}
    public record UserRegistrationResponse(boolean isRegistered, String message){}

}