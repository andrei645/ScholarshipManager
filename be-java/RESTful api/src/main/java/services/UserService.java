package services;

import dataprovider.Data;
import models.User;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class UserService {

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

}
