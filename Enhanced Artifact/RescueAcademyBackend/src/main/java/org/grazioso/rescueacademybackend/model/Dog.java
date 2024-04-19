/**
 * The Dog class is an entity or model class that represents a dog in the application.
 * It extends the RescueAnimal class and provides additional properties and methods specific to dogs.
 *
 * @author Justin Swinney
 * @version 1.0
 *
 * */
package org.grazioso.rescueacademybackend.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document("rescue_animals")
@TypeAlias("dog")
public class Dog extends RescueAnimal {

    @NotBlank(message = "Breed is required")
    private String breed;
}