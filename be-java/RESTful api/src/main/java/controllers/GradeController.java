// GradeController.java
package controllers;

import api.GradeApi;
import exceptions.NotFoundException;
import models.Grade;
import services.GradeService;

public class GradeController implements GradeApi {

    @Override
    public void addGrade(Grade grade) {
        GradeService.addGrade(grade);
    }
}
