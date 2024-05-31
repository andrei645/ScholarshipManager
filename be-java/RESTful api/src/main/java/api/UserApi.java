package api;

import exceptions.NotFoundException;
import handlers.Response;
import models.User;
import models.Course;
import models.Grade;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

public interface UserApi {
    User getUserByEmail(String email) throws NotFoundException;
    Response updateUser(User user) throws NotFoundException, NoSuchAlgorithmException;
    Response deleteUser(String email) throws NotFoundException;

    List<Grade> getGradesByUserId(Long userId) throws NotFoundException;
    List<Course> getCoursesByUserId(Long userId) throws NotFoundException;
    Map<Course, List<Grade>> getCourseAndNotesByUserId(Long userId) throws NotFoundException;
}
