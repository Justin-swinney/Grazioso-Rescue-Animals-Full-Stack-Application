public class Monkey extends RescueAnimal {
    //Variables for monkey class
    private String bodyLength;
    private String height;
    private String tailLength;

    private String species;

    public Monkey (String bodyLength, String height, String tailLength, String species, String name, String age, String weight, String gender, String acquisitionDate, String acquisitionCountry, String trainingStatus,boolean reserved, String inServiceCountry) {
        this.bodyLength = bodyLength;
        this.height = height;
        this.tailLength = tailLength;
        this.species = species;
        setGender(gender);
        setAge(age);
        setWeight(weight);
        setAcquisitionDate(acquisitionDate);
        setAcquisitionLocation(acquisitionCountry);
        setTrainingStatus(trainingStatus);
        setReserved(reserved);
        setInServiceCountry(inServiceCountry);
        setName(name);
    }
        //accessors and mutators
    public void setBodyLength(String bodyLength) {
        this.bodyLength = bodyLength;
    }
    public String getBodyLength() {
        return bodyLength;
    }

    public void setHeight(String height){
        this.height = height;
    }
    public String getHeight() {
        return height;
    }

    public void setTailLength(String tailLength) {

        this.tailLength = tailLength;
    }
    public String getTailLength() {
        return tailLength;
    }
    public void setSpecies(String species) {
        this.species = species;
    }
    public String getSpecies() {
        return species;
    }


        }





