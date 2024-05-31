package controllers;

import datatransferobjects.CourseGradesDTO;
import api.UserApi;
import exceptions.NotFoundException;
import handlers.Response;
import models.Course;
import models.Grade;
import models.User;
import services.UserService;
import utils.PasswordEncryptor;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


public class UserController implements UserApi {
    @Override
    public User getUserByEmail(String email) throws NotFoundException {
        User user = UserService.findUserByEmail(email);
        if (user == null) {
            throw new NotFoundException(String.format("User with email : %s not found", email));
        }
        return user;
    }


    @Override
    public Response updateUser(User user) throws NotFoundException, NoSuchAlgorithmException {

        User existingUser = UserService.findUserByEmail(user.getEmail());
        if (existingUser == null) {
            throw new NotFoundException("User not found");
        }

        // Update fields based on the current structure
        existingUser.setNrMat(user.getNrMat());
        existingUser.setNumeFam(user.getNumeFam());
        existingUser.setPrenume(user.getPrenume());
        existingUser.setParola(PasswordEncryptor.encryptPassword(user.getParola()));
        existingUser.setRole(user.getRole());

        UserService.updateUser(existingUser);

        return Response.ok();
    }


    @Override
    public Response deleteUser(String email) throws NotFoundException {
        if (UserService.findUserByEmail(email) == null) {
            throw new NotFoundException(String.format("User with email: %s can't be found", email));
        }

        UserService.deleteUser(email);
        return Response.ok();
    }

    @Override
    public List<Grade> getGradesByUserId(Long userId) {
        return UserService.getGradesByUserId(userId);
    }

    @Override
    public List<Course> getCoursesByUserId(Long userId) {
        return UserService.getCoursesByUserId(userId);
    }

    @Override
    public List<CourseGradesDTO> getCourseAndNotesByUserId(Long userId) {
        List<CourseGradesDTO> courseGradesDTO = new ArrayList<>();

        UserService.getCourseAndNotesByUserId(userId).forEach((k, v) -> {
            courseGradesDTO.add(new CourseGradesDTO(k.getName(),
                    v.stream().map(Grade::getValue).collect(Collectors.toList())));
        });
        return courseGradesDTO;
    }
}
