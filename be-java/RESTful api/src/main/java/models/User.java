package models;

public class User {

    private Long id;
    private Long nrMat;
    private String numeFam;
    private String prenume;
    private String email;
    private String parola;
    private String role;

    public User() {
    }

    public User(Long id, Long nrMat, String numeFam, String prenume, String email, String parola, String role) {
        this.id = id;
        this.nrMat = nrMat;
        this.numeFam = numeFam;
        this.prenume = prenume;
        this.email = email;
        this.parola = parola;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNrMat() {
        return nrMat;
    }

    public void setNrMat(Long nrMat) {
        this.nrMat = nrMat;
    }

    public String getNumeFam() {
        return numeFam;
    }

    public void setNumeFam(String numeFam) {
        this.numeFam = numeFam;
    }

    public String getPrenume() {
        return prenume;
    }

    public void setPrenume(String prenume) {
        this.prenume = prenume;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getParola() {
        return parola;
    }

    public void setParola(String parola) {
        this.parola = parola;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
