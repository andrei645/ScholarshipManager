package handlers;

import api.*;
import authorization.AuthenticationRequest;
import authorization.AuthorizationController;
import authorization.RegisterRequest;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import controllers.CourseController;
import controllers.GradeController;
import controllers.UserController;
import exceptions.*;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import models.*;
import utils.DateDeserializer;
import utils.KeyGenerator;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


public class RequestHandler implements HttpHandler {
    private static final String SECRET_KEY = KeyGenerator.getInstance().getSecretKey();
    private final AuthorizationApi authorizationApi;
    private final UserApi userApi;
    private final GradeApi gradeApi;
    private final CourseApi courseApi;

    public RequestHandler() {
        authorizationApi = new AuthorizationController();
        userApi = new UserController();
        gradeApi = new GradeController();
        courseApi = new CourseController();
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            // Set CORS headers for preflight request
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
            exchange.getResponseHeaders().add("Access-Control-Expose-Headers", "Authorization");
            exchange.sendResponseHeaders(200, -1); // Send 200 status for preflight request
            return;
        }

        // Set CORS headers for actual request
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");

        String authorizationHeader = exchange.getRequestHeaders().getFirst("Authorization");
        String method = exchange.getRequestMethod();
        String path = exchange.getRequestURI().getPath();
        String body = new BufferedReader(new InputStreamReader(exchange.getRequestBody()))
                .lines().collect(Collectors.joining("\n"));
        String response;
        int statusCode;

        //Public endpoints section, don't need authorization
        if (method.equals("POST") && path.matches("/api/register")) {
            try {
                RegisterRequest registerRequest = fromJson(body, RegisterRequest.class);
                response = String.valueOf(authorizationApi.register(registerRequest));
                statusCode = 201;
            } catch (RegisterConflictException e) {
                response = e.getMessage();
                statusCode = 409;
            } catch (NoSuchAlgorithmException e) {
                response = e.getMessage();
                statusCode = 500;
            }
        } else if (method.equals("POST") && path.matches("/api/authenticate")) {
            try {
                AuthenticationRequest authenticationRequest = fromJson(body, AuthenticationRequest.class);
                response = authorizationApi.authenticate(authenticationRequest).getTokenJwt();
                statusCode = 200;
            } catch (AuthenticationException e) {
                response = e.getMessage();
                statusCode = 400;
            } catch (NoSuchAlgorithmException e) {
                response = e.getMessage();
                statusCode = 500;
            }
        } else {
            //Here is the part where authorization by jwt is made
            //removed "Bearer " from jwt

            if (authorizationHeader != null && isValidToken(authorizationHeader.substring(7))) {
                String jwtToken = authorizationHeader.substring(7);

                Claims claims = Jwts.parser()
                        .setSigningKey(SECRET_KEY)
                        .parseClaimsJws(jwtToken)
                        .getBody();

                //User role and subject obtained from jwt payload
                String payloadUserMail = (String) claims.get("email");
                Long payloadUserId = (Long) claims.get("id");
                String payloadUserRole = (String) claims.get("role");


                try {
                    if (method.equals("DELETE") && path.matches("/api/users")) {
                        response = String.valueOf(userApi.deleteUser(payloadUserMail));
                        statusCode = 200;
                    } else if (method.equals("GET") && path.matches("/api/users")) {
                        User user = userApi.getUserByEmail(payloadUserMail);
                        response = toJson(user);
                        statusCode = 200;
                    } else if (method.equals("PUT") && path.matches("/api/users")) {
                        User user = fromJson(body, User.class);
                        response = String.valueOf(userApi.updateUser(user));
                        statusCode = 200;
                    } else if (method.equals("GET") && path.matches("/api/users/grades")) {
                        List<Grade> grades = userApi.getGradesByUserId(payloadUserId);
                        response = toJson(grades);
                        statusCode = 200;
                    } else if (method.equals("GET") && path.matches("/api/users/courses")) {
                        List<Course> courses = userApi.getCoursesByUserId(payloadUserId);
                        response = toJson(courses);
                        statusCode = 200;
                    } else if (method.equals("POST") && path.matches("/api/users/coursesAndNotes")) {
                        Map<Course, List<Grade>> courseGradesMap = userApi.getCourseAndNotesByUserId(payloadUserId);
                        response = toJson(courseGradesMap);
                        statusCode = 200;
                    } else if (method.equals("POST") && path.matches("/api/users/courses")) {
                        try {
                            // Assuming payloadCourse contains the course details extracted from the request
                            Course course = fromJson(body, Course.class);

                            // Create the course
                            courseApi.createCourse(course);

                            // Set the response body and status code
                            response = "Course created successfully";
                            statusCode = 201; // Created
                        } catch (Exception e) {
                            // Handle any exceptions that may occur
                            response = e.getMessage();
                            statusCode = 500; // Internal Server Error
                        }
                    } else if (method.equals("DELETE") && path.matches("/api/users/courses/\\d+")) {
                        try {
                            Long courseId = Long.parseLong(path.substring(path.lastIndexOf('/') + 1));
                            // Assuming payloadCourseId contains the course ID extracted from the request

                            // Delete the course
                            courseApi.deleteCourse(courseId);

                            // Set the response body and status code
                            response = "Course deleted successfully";
                            statusCode = 200; // OK
                        } catch (Exception e) {
                            // Handle any exceptions that may occur
                            response = e.getMessage();
                            statusCode = 500; // Internal Server Error
                        }
                    }
                    else if (method.equals("POST") && path.matches("/api/users/grades")) {
                        try {
                            // Assuming payloadGrade contains the grade details extracted from the request
                            Grade grade = fromJson(body, Grade.class);

                            // Add the grade
                            gradeApi.addGrade(grade);

                            // Set the response body and status code
                            response = "Grade added successfully";
                            statusCode = 201; // Created
                        } catch (Exception e) {
                            // Handle any exceptions that may occur
                            response = e.getMessage();
                            statusCode = 500; // Internal Server Error
                        }
                    }else {
                        response = "Endpoint not found";
                        statusCode = 404;
                    }
                } catch (NotFoundException e) {
                    response = e.getMessage();
                    statusCode = 404;
                }
                //TODO: restore it when it will be thrown
//                catch (AuthorizationException e) {
//                    response = e.getMessage();
//                    statusCode = 401;
//                }

                catch (Exception e) {
                    response = String.format("Internal Server Error: %s", e.getMessage());
                    statusCode = 500;
                }
            } else {
                response = "Unauthorized";
                statusCode = 401;
            }
        }

        // Send the response
        exchange.getResponseHeaders().add("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, response.length());
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }

    private <T> T fromJson(String json, Class<T> clazz) {

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(Date.class, new DateDeserializer("dd-MM-yyyy"));
        Gson gson = gsonBuilder.create();

        return gson.fromJson(json, clazz);
    }

    private String toJson(Object object) {
        return new Gson().toJson(object);
    }

    private boolean isValidToken(String token) {

        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();

            // Check if the token has expired
            Date expirationDate = claims.getExpiration();
            Date now = new Date();
            return !expirationDate.before(now);

        } catch (JwtException e) {
            return false;
        }
    }


}
