package api;

import exceptions.NotFoundException;
import models.Course;

import java.util.List;

public interface CourseApi {
    void createCourse(Course course);
    void deleteCourse(Long courseId) throws NotFoundException;
    List<Course> getCoursesByUserId(Long userId);
}
