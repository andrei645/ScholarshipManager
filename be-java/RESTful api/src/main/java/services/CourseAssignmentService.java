package services;

import dataprovider.Data;

import java.sql.PreparedStatement;
import java.sql.SQLException;

public class CourseAssignmentService {

    public static void assignUserToCourse(long userId, long courseId) {
        String query = "INSERT INTO user_courses (user_id, course_id) VALUES (?, ?)";

        try (PreparedStatement statement = Data.getInstance().getConnection().prepareStatement(query)) {
            statement.setLong(1, userId);
            statement.setLong(2, courseId);

            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
