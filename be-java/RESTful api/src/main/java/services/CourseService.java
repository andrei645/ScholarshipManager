package services;

import dataprovider.Data;
import exceptions.NotFoundException;
import models.Course;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import models.User;

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

    public static List<Course> getCoursesByUserId(Long userId) {
        List<Course> courses = new ArrayList<>();
        String query = "SELECT c.id, c.name FROM courses c " +
                "INNER JOIN user_courses uc ON c.id = uc.course_id " +
                "WHERE uc.user_id = ?";

        try (PreparedStatement statement = Data.getInstance().getConnection().prepareStatement(query)) {
            statement.setLong(1, userId);

            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Course course = new Course();
                course.setId(resultSet.getLong("id"));
                course.setName(resultSet.getString("name"));
                courses.add(course);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return courses;
    }

    public static List<Course> getAllCourses() {
        // This method would typically interact with a database
        // to retrieve all courses. For this example, we'll mock the data.
        List<Course> courses = new ArrayList<>();
        try {
            String query = "SELECT id, name FROM courses";
            PreparedStatement statement = Data.getInstance().getConnection().prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                Long id = resultSet.getLong("id");
                String name = resultSet.getString("name");
                courses.add(new Course(id, name));
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error fetching courses: " + e.getMessage());
        }
        return courses;
    }

}
