package models;

public class Grade {
    private Long studentId;
    private Long courseId;
    private Float value;

    public Grade() {
    }

    public Grade(Long studentId, Long courseId, Float value) {
        this.studentId = studentId;
        this.courseId = courseId;
        this.value = value;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Float getValue() {
        return value;
    }

    public void setValue(Float value) {
        this.value = value;
    }
}
