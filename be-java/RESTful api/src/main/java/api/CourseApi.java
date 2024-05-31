package api;

import exceptions.NotFoundException;
import models.Course;

public interface CourseApi {
    void createCourse(Course course);
    void deleteCourse(Long courseId) throws NotFoundException;
}
