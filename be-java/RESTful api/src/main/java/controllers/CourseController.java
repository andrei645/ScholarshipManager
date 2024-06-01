// CourseController.java
package controllers;

import api.CourseApi;
import exceptions.NotFoundException;
import models.Course;
import services.CourseService;

import java.util.List;

public class CourseController implements CourseApi {

    @Override
    public void createCourse(Course course) {
        CourseService.createCourse(course);
    }

    @Override
    public void deleteCourse(Long courseId) throws NotFoundException {
        CourseService.deleteCourse(courseId);
    }

    @Override
    public List<Course> getCoursesByUserId(Long userId) {
        return CourseService.getCoursesByUserId(userId);
    }
}
