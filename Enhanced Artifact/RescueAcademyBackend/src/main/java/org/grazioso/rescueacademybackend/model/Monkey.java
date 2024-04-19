/**
 * The Monkey class is an entity or model class that represents a monkey in the application.
 * It extends the RescueAnimal class and provides additional properties and methods specific to monkeys.
 *
 * @author Justin Swinney
 * @version 1.0
 *
 * */
package org.grazioso.rescueacademybackend.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document("rescue_animals")
@TypeAlias("monkey")
public class Monkey extends RescueAnimal {

    @NotBlank(message = "Monkey species is required")
    private String species;

    @Min(value = 0, message = "Body length must be 0 inches or more")
    @Max(value = 120, message = "Body length must be 240 inches or less")
    private double bodyLength;  // Measurement from top of head to base of tail

    @Min(value = 0, message = "Tail length must be 0 inches or more")
    @Max(value = 240, message = "Tail length must be 240 inches or less")
    private double tailLength;

    @Min(value = 0, message = "Height must be 0 inches or more")
    @Max(value = 120, message = "Height must be 240 inches or less")
    private double height;
}
