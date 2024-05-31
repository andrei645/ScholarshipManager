package services;

import dataprovider.Data;
import models.Grade;

import java.sql.PreparedStatement;
import java.sql.SQLException;

public class GradeService {

    public static void addGrade(Grade grade) {
        String query = "INSERT INTO grades (student_id, course_id, value) VALUES (?, ?, ?)";

        try (PreparedStatement statement = Data.getInstance().getConnection().prepareStatement(query)) {
            statement.setLong(1, grade.getStudentId());
            statement.setLong(2, grade.getCourseId());
            statement.setFloat(3, grade.getValue());

            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
