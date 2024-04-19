/**
 * The Rescue Animal class is an entity or model class and is the base class for the Dog and Monkey classes.
 * It contains the fields and methods that are common to both Dog and Monkey classes.
 *
 * @author Justin Swinney
 * @version 1.0
 *
 * */
package org.grazioso.rescueacademybackend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "animalType")
@JsonSubTypes({
        @JsonSubTypes.Type(value = Dog.class, name = "dog"),
        @JsonSubTypes.Type(value = Monkey.class, name = "monkey")
})
@Setter
@Getter
@Document("rescue_animals")
@TypeAlias("animal")
public class RescueAnimal {

    @Id
    private String id;

    @Indexed
    @NotBlank(message = "Rescue type is required")
    private String rescueType;

    @NotBlank(message = "Animal name is required")
    private String name;

    @NotBlank(message = "Animal training status is required")
    private String trainingStatus;

    private String gender;

    private String originCountry;

    private String inServiceLocation;

    @Min(value = 0, message = "Age must be 0 or more")
    @Max(value = 100, message = "Age Must be 100 or less")
    private int age;

    @Min(value = 0, message = "Weight must be 0lbs or more")
    @Max(value = 2000, message = "Weight must be 2000lbs or less")
    private double weight;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
    @NotNull(message = "Date is required")
    private Date originDate;

    private boolean reserved;

    private String animalProfilePictureUrl;
}