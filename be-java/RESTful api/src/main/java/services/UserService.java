package services;

import dataprovider.Data;
import models.Course;
import models.Grade;
import models.User;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserService {

    ///User related methods

    public static User findUserByEmail(String email) {

        String query = "SELECT id, nr_mat, nume_fam, prenume, email, parola, role FROM users WHERE email = ?";

        try (PreparedStatement statement = Data.getInstance().getConnection().prepareStatement(query)) {
            statement.setString(1, email);

            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                User user = new User();
                user.setId(resultSet.getLong("id"));
                user.setNrMat(resultSet.getLong("nr_mat"));
                user.setNumeFam(resultSet.getString("nume_fam"));
                user.setPrenume(resultSet.getString("prenume"));
                user.setEmail(resultSet.getString("email"));
                user.setParola(resultSet.getString("parola"));
                user.setRole(resultSet.getString("role"));
                return user;
            } else {
                return null;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    public static void saveUser (User user) {

        String query = "INSERT INTO users (nr_mat, nume_fam, prenume, email, parola, role) " +
                "VALUES (?, ?, ?, ?, ?, ?)";

        try (PreparedStatement statement = Data.getInstance().getConnection().prepareStatement(query)) {
            statement.setLong(1, user.getNrMat());
            statement.setString(2, user.getNumeFam());
            statement.setString(3, user.getPrenume());
            statement.setString(4, user.getEmail());
            statement.setString(5, user.getParola());
            statement.setString(6, user.getRole());

            statement.executeUpdate();

        } catch (SQLException e) {
            System.out.println("Error when saving user: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public static void updateUser(User user) {
        String query = "UPDATE users SET nr_mat = ?, nume_fam = ?, prenume = ?, parola = ?, role = ? WHERE email = ?";

        try (PreparedStatement statement = Data.getInstance().getConnection().prepareStatement(query)) {
            statement.setLong(1, user.getNrMat());
            statement.setString(2, user.getNumeFam());
            statement.setString(3, user.getPrenume());
            statement.setString(4, user.getParola());
            statement.setString(5, user.getRole());
            statement.setString(6, user.getEmail());

            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    public static void deleteUser(String email) {

        String query = "DELETE FROM users WHERE email = ?";

        try (PreparedStatement statement = Data.getInstance().getConnection().prepareStatement(query)) {
            statement.setString(1, email);

            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    //Courses and Grades By User Id

    public static List<Grade> getGradesByUserId(Long userId) {
        List<Grade> grades = new ArrayList<>();

        String query = "SELECT student_id, course_id, value FROM grades WHERE student_id = ?";

        try (PreparedStatement statement = Data.getInstance().getConnection().prepareStatement(query)) {
            statement.setLong(1, userId);

            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Grade grade = new Grade();
                grade.setStudentId(resultSet.getLong("student_id"));
                grade.setCourseId(resultSet.getLong("course_id"));
                grade.setValue(resultSet.getFloat("value"));
                grades.add(grade);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return grades;
    }

    public static List<Course> getCoursesByUserId(Long userId) {
        List<Course> courses = new ArrayList<>();

        String query = "SELECT c.id, c.name FROM courses c JOIN user_courses uc ON c.id = uc.course_id WHERE uc.user_id = ?";

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

    public static Map<Course, List<Grade>> getCourseAndNotesByUserId(Long userId) {
        Map<Course, List<Grade>> courseGradesMap = new HashMap<>();

        String query = "SELECT c.id AS course_id, c.name AS course_name, g.value AS grade " +
                "FROM users u " +
                "JOIN user_courses uc ON u.id = uc.user_id " +
                "JOIN courses c ON uc.course_id = c.id " +
                "LEFT JOIN grades g ON u.id = g.student_id AND c.id = g.course_id " +
                "WHERE u.id = ?";

        try (PreparedStatement statement = Data.getInstance().getConnection().prepareStatement(query)) {
            statement.setLong(1, userId);

            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Course course = new Course();
                course.setId(resultSet.getLong("course_id"));
                course.setName(resultSet.getString("course_name"));

                Grade grade = new Grade();
                grade.setStudentId(userId); // Set student ID to the provided user ID
                grade.setCourseId(resultSet.getLong("course_id"));
                grade.setValue(resultSet.getFloat("grade"));

                // Retrieve or create list of Grade objects for the course
                List<Grade> gradeList = courseGradesMap.computeIfAbsent(course, key -> new ArrayList<>());
                gradeList.add(grade);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return courseGradesMap;
    }
}
