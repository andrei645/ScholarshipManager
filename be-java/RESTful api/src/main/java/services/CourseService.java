package services;

import dataprovider.Data;
import exceptions.NotFoundException;
import models.Course;

import java.sql.PreparedStatement;
import java.sql.SQLException;

public class CourseService {

    public static void createCourse(Course course) {
        String query = "INSERT INTO courses (name) VALUES (?)";

        try (PreparedStatement statement = Data.getInstance().getConnection().prepareStatement(query)) {
            statement.setString(1, course.getName());

            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void deleteCourse(Long courseId) throws NotFoundException {
        // Delete grades associated with the course
        String deleteGradesQuery = "DELETE FROM grades WHERE course_id = ?";
        try (PreparedStatement statement = Data.getInstance().getConnection().prepareStatement(deleteGradesQuery)) {
            statement.setLong(1, courseId);
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        // Delete entries from user_courses
        String deleteUserCoursesQuery = "DELETE FROM user_courses WHERE course_id = ?";
        try (PreparedStatement statement = Data.getInstance().getConnection().prepareStatement(deleteUserCoursesQuery)) {
            statement.setLong(1, courseId);
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        // Delete the course
        String deleteCourseQuery = "DELETE FROM courses WHERE id = ?";

        try (PreparedStatement statement = Data.getInstance().getConnection().prepareStatement(deleteCourseQuery)) {
            statement.setLong(1, courseId);

            int rowsAffected = statement.executeUpdate();
            if (rowsAffected == 0) {
                throw new NotFoundException("Course not found");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
