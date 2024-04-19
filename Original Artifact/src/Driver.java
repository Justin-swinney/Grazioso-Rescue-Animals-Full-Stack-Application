import java.util.ArrayList;
import java.util.Scanner;
public class Driver {
    private static ArrayList<Dog> dogList = new ArrayList<Dog>();
    private static ArrayList<Monkey> monkeyList = new ArrayList<Monkey>();
    // Instance variables (if needed)

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        initializeDogList();
        initializeMonkeyList();

        // Add a loop that displays the menu, accepts the users input
        // and takes the appropriate action.
        // For the project submission you must also include input validation
        // and appropriate feedback to the user.
        // Hint: create a Scanner and pass it to the necessary
        // methods
        // Hint: Menu options 4, 5, and 6 should all connect to the printAnimals() method.
        boolean start = true; //start-end variable
        while (start) { //while start is true
            displayMenu();
            String menuSelection = scanner.nextLine();
            switch (menuSelection) {
                case "1":
                    intakeNewDog(scanner);
                    break;
                case "2":
                    intakeNewMonkey(scanner);
                    break;
                case "3":
                    reserveAnimal(scanner);
                    break;
                case "4"://print all dogs
                case "5":
                    printAnimals(menuSelection);
                    break;
                case "6"://print all non-reserved animals

                case "q":
                    start = false;
                    break;

                default:
                    System.out.println("Invalid input, please try again."); // incorrect input prompt this output
            }
        }
    }

    // This method prints the menu options
    public static void displayMenu() {
        System.out.println("\n\n");
        System.out.println("\t\t\t\tRescue Animal System Menu");
        System.out.println("[1] Intake a new dog");
        System.out.println("[2] Intake a new monkey");
        System.out.println("[3] Reserve an animal");
        System.out.println("[4] Print a list of all dogs");
        System.out.println("[5] Print a list of all monkeys");
        System.out.println("[6] Print a list of all animals that are not reserved");
        System.out.println("[q] Quit application");
        System.out.println();
        System.out.println("Enter a menu selection");
    }


    // Adds dogs to a list for testing
    public static void initializeDogList() {
        Dog dog1 = new Dog("Spot", "German Shepherd", "male", "1", "25.6", "05-12-2019", "United States", "intake", false, "United States");
        Dog dog2 = new Dog("Rex", "Great Dane", "male", "3", "35.2", "02-03-2020", "United States", "Phase I", false, "United States");
        Dog dog3 = new Dog("Bella", "Chihuahua", "female", "4", "25.6", "12-12-2019", "Canada", "in service", true, "Canada");

        dogList.add(dog1);
        dogList.add(dog2);
        dogList.add(dog3);
    }


    // Adds monkeys to a list for testing
    //Optional for testing
    public static void initializeMonkeyList() {
        Monkey monkey1 = new Monkey("5'", "6'","3'","Capuchin","Fred","10","110lbs","Male","04-04-04","United States","Active", false,"United States");
        Monkey monkey2 = new Monkey("4'", "4'","2'","Marmoset","Richard","15","80lbs","Male","07-07-07","United States","Phase II", true,"United States");
        Monkey monkey3 = new Monkey("6'", "7'","4'","Guenon","Sam","25","150lbs","Female","10-15-02","United States","Complete", true,"United States");

        monkeyList.add(monkey1);
        monkeyList.add(monkey2);
        monkeyList.add(monkey3);
    }


    // Complete the intakeNewDog method
    // The input validation to check that the dog is not already in the list
    // is done for you
    public static void intakeNewDog(Scanner scanner) {
        System.out.println("What is the dog's name?");
        String name = scanner.nextLine();
        for(Dog dog: dogList) {
            if(dog.getName().equalsIgnoreCase(name)) {
                System.out.println("\n\nThis dog is already in our system\n\n");
                return; //returns to menu
            }
        }

        // Appropriate list for the animal type dog
        System.out.print("Enter Breed of " + name + ":");
        String Breed = scanner.nextLine();
        System.out.print("Enter gender of " + name + ":");
        String Gender = scanner.nextLine();
        System.out.print("Enter the age of " + name + ":");
        String Age = scanner.nextLine();
        System.out.print("Enter the weight of " + name + ":");
        String Weight = scanner.nextLine();
        System.out.print("Enter the acquisition date of " + name + ":");
        String AcquisitionDate = scanner.nextLine();
        System.out.print("Enter the acquisition country of " + name + ":");
        String acquisitionCountry = scanner.nextLine();
        System.out.print("Enter status for " + name + ":");
        String trainingStatus = scanner.nextLine();
        boolean reserved = trainingStatus.equals("true");
        System.out.print("Enter the country you received" + name + ":");
        String inServiceCountry = scanner.nextLine();
        Dog newDog = new Dog(name, Breed, Gender, Age, Weight, AcquisitionDate, acquisitionCountry, trainingStatus, reserved,inServiceCountry);
        dogList.add(newDog);
        System.out.println(name + " is added to dog list!");
    }


    // Complete intakeNewMonkey
    //Instantiate and add the new monkey to the appropriate list
    // For the project submission you must also  validate the input
    // to make sure the monkey doesn't already exist and the species type is allowed
    public static void intakeNewMonkey(Scanner scanner) {
        System.out.print("Enter the name of the monkey:");
        String name = scanner.nextLine();
        for (Monkey currentMonkey: monkeyList) {
            if (currentMonkey.getName().equals(name)) {
                System.out.println(name + " is already in our list!");
                return;
            }
        }
        System.out.print("Enter the body length of  " + name + ":");
        String bodyLength = scanner.nextLine();
        System.out.print("Enter height of " + name + ":");
        String height = scanner.nextLine();
        System.out.print("Enter the tail length of " + name + ":");
        String tailLength = scanner.nextLine();
        System.out.print("Enter the species of " + name + ":");
        String species = scanner.nextLine();
        System.out.print("Enter the age of " + name + ":");
        String age = scanner.nextLine();
        System.out.print("Enter the weight of " + name + ":");
        String weight = scanner.nextLine();
        System.out.print("Enter the gender of " + name + ":");
        String gender = scanner.nextLine();
        System.out.print("Enter the acquisition date of " + name + ":");
        String acquisitionDate = scanner.nextLine();
        System.out.print("Enter the acquisition country of " + name + ":");
        String acquisitionCountry = scanner.nextLine();
        System.out.print("Is " + name + "in service:");
        String trainingStatus = scanner.nextLine();
        boolean reserved = trainingStatus.equals("true");
        System.out.print("Enter the in service country of " + name + ":");
        String inServiceCountry = scanner.nextLine();
        Monkey newMonkey = new Monkey(bodyLength, height, tailLength, species, name, age, weight, gender, acquisitionDate, acquisitionCountry, trainingStatus, reserved, inServiceCountry);
        System.out.println(name + " is added to monkey list!");
        monkeyList.add(newMonkey);
    }

    // Complete reserveAnimal
    // You will need to find the animal by animal type and in service country
    public static void reserveAnimal(Scanner scanner) {
        System.out.println("What type of animal is it?");

        String type = scanner.nextLine();

        System.out.println("What is the animal in-service country?");

        String country = scanner.nextLine();

// Monkey list search

        for (Monkey monkey:monkeyList) {

            if (monkey.getSpecies().equalsIgnoreCase(type) && monkey.getInServiceLocation().equalsIgnoreCase(country) && monkey.getTrainingStatus().equals("trained")) {

                if (!monkey.getReserved()) {

                    monkey.setReserved(true);

                    System.out.println("Animal is available: " + monkey.getName());

                    return;
                }
            }
        }


// Dog list search

        for (Dog dog:dogList) {

            if (dog.getBreed().equalsIgnoreCase(type) && dog.getInServiceLocation().equalsIgnoreCase(country) && dog.getTrainingStatus().equals("trained")) {

                if (!dog.getReserved()) {

                    dog.setReserved(true);

                    System.out.println("Animal is available: " + dog.getName());

                    return;
                }
            }
        }
    }






    // Complete printAnimals
    // Include the animal name, status, acquisition country and if the animal is reserved.
    // Remember that this method connects to three different menu items.
    // The printAnimals() method has three different outputs
    // based on the listType parameter
    // dog - prints the list of dogs
    // monkey - prints the list of monkeys
    // available - prints a combined list of all animals that are
    // fully trained ("in service") but not reserved
    // Remember that you only have to fully implement ONE of these lists.
    // The other lists can have a print statement saying "This option needs to be implemented".
    // To score "exemplary" you must correctly implement the "available" list.
    public static void printAnimals(String menuSelection) {
        if (menuSelection.equals("4")) {
            System.out.println(":All Dogs:");
            for (Dog currentDog : dogList) {
                System.out.println("Name:" + currentDog.getName() + "\tStatus:" + currentDog.getTrainingStatus() + "\tCountry:" + currentDog.getAcquisitionLocation() + "\tReserved:" + currentDog.getReserved());
            }
        } else if (menuSelection.equals("5")) {
            System.out.println(":All Monkeys:");
            for (Monkey currentMonkey : monkeyList) {
                System.out.println("Name:" + currentMonkey.getName() + "\tStatus:" + currentMonkey.getTrainingStatus() + "\tCountry:" + currentMonkey.getAcquisitionLocation() + "\tReserved:" + currentMonkey.getReserved());
            }
        } else {
            System.out.println(":All unreserved animals:");
            for (Dog currentDog : dogList) {
                if (!currentDog.getReserved()) {
                    System.out.println("Name:" + currentDog.getName() + "\tStatus:" + currentDog.getTrainingStatus() + "\tCountry:" + currentDog.getAcquisitionLocation());
                }
            }
            for (Monkey currentMonkey : monkeyList) {
                if (!currentMonkey.getReserved()) {
                    System.out.println("Name:" + currentMonkey.getName() + "\tStatus:" + currentMonkey.getTrainingStatus() + "\tCountry:" + currentMonkey.getAcquisitionLocation());
                }
            }
        }

    }
}