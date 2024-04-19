/**
 * Rescue animal model
 *
 * @author Justin Swinney
 * @Date 3/25/2024
 * @version 1.0
 *
 * */

export class RescueAnimal {
  id?: string;
  animalType?: string;
  rescueType?: string;
  name?: string;
  trainingStatus?: string;
  gender?: string;
  originCountry?: string;
  inServiceLocation?: string;
  age?: number;
  weight?: number;
  originDate?: Date;
  reserved?: boolean;
  animalProfilePictureUrl?: string

  // Dog Specific
  breed?: string;

  // Monkey Specific
  species?: string;
  bodyLength?: number;
  tailLength?: number;
  height?: number;
}
