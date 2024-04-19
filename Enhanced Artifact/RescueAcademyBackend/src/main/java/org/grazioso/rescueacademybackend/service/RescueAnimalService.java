/**
 * The Rescue Animal Service class is responsible for handling all the business logic for the Rescue Animal model.
 * It provides methods for retrieving, creating, updating, and deleting Rescue Animals, as well as filtering and searching for animals based on their attributes.
 *
 * @author Justin Swinney
 * @version 1.0
 *
 * */
package org.grazioso.rescueacademybackend.service;

import org.grazioso.rescueacademybackend.model.RescueAnimal;
import org.grazioso.rescueacademybackend.repository.RescueAnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
public class RescueAnimalService {

    private final RescueAnimalRepository rescueAnimalRepository;

    private final MongoTemplate mongoTemplate;

    @Autowired
    public RescueAnimalService(RescueAnimalRepository rescueAnimalRepository, MongoTemplate mongoTemplate) {
        this.rescueAnimalRepository = rescueAnimalRepository;
        this.mongoTemplate = mongoTemplate;
    }

    // Get all rescue animals from the database.
    public List<RescueAnimal> getAllAnimals() {
        return rescueAnimalRepository.findAll();
    }

    // Get specific rescue animal info by object ID from database.
    public RescueAnimal getAnimalById(String id) {
        return rescueAnimalRepository.findById(id).orElse(null);
    }

    // Create new rescue animal and save to database.
    public RescueAnimal createRescueAnimal(RescueAnimal animal) {
        return rescueAnimalRepository.save(animal);
    }

    // Update specific rescue animal by object ID and update database.
    public void updateRescueAnimal(String id, Map<String, Object> updates) {
        if (updates.containsKey("originDate")) {
            String dateString = (String) updates.get("originDate");
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
            LocalDate date = LocalDate.parse(dateString, formatter);
            updates.put("originDate", date); // Replace the string with the LocalDate object
        }

        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update();
        updates.forEach(update::set);
        mongoTemplate.updateFirst(query, update, RescueAnimal.class);
    }

    // Delete specific rescue animal by object ID from database.
    public void deleteRescueAnimal(String id) {
        rescueAnimalRepository.deleteById(id);
    }

}