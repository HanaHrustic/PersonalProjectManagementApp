package com.hhrustic.ppmapp.controllers;

import com.hhrustic.ppmapp.domain.Project;
import com.hhrustic.ppmapp.services.MapValidationErrorService;
import com.hhrustic.ppmapp.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal){
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(result);
        if(errorMap!=null) return errorMap;

        Project savedProject = projectService.saveOrUpdateproject(project, principal.getName());
        return new ResponseEntity<Project>(savedProject, HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectId, Principal principal){
        Project project = projectService.findProjectByIdentifier(projectId, principal.getName());
        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Project> getAllProjects(Principal principal){
        return projectService.findAllProjects(principal.getName());
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectId, Principal principal){
        projectService.deleteProjectByIdentifier(projectId, principal.getName());

        return new ResponseEntity<String>("Project with ID '" + projectId + "' was deleted", HttpStatus.OK);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<?> updateProject(@PathVariable String projectId, @Valid @RequestBody Project project, Principal principal){
        projectService.updateProjectByIdentifier(projectId, project, principal.getName());
        Map<String, String> responseMessage = new HashMap<>();
        responseMessage.put("message", "Project with ID '" + projectId + "' has been updated");
        return new ResponseEntity<Map<String, String>>( responseMessage, HttpStatus.OK);
    }
}
