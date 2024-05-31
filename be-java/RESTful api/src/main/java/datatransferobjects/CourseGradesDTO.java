package datatransferobjects;

import java.util.List;

public class CourseGradesDTO {
    private String courseName;
    private List<Float> grades;

    public CourseGradesDTO() {
    }

    public CourseGradesDTO(String courseName, List<Float> grades) {
        this.courseName = courseName;
        this.grades = grades;
    }

    public List<Float> getGrades() {
        return grades;
    }

    public void setGrades(List<Float> grades) {
        this.grades = grades;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
}
