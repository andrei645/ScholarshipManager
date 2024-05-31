package authorization;

public class RegisterRequest {

    private Long nrMat;
    private String numeFam;
    private String prenume;
    private String email;
    private String password;
    private String role;

    public RegisterRequest() {
    }

    public RegisterRequest(Long nrMat, String numeFam, String prenume, String email, String password, String role) {
        this.nrMat = nrMat;
        this.numeFam = numeFam;
        this.prenume = prenume;
        this.email = email;
        this.password = password;
        this.role = role;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
