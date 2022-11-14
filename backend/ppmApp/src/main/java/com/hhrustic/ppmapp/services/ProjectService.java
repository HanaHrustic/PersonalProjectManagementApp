package com.hhrustic.ppmapp.services;

import com.hhrustic.ppmapp.domain.Backlog;
import com.hhrustic.ppmapp.domain.Project;
import com.hhrustic.ppmapp.domain.User;
import com.hhrustic.ppmapp.exceptions.ProjectIdException;
import com.hhrustic.ppmapp.exceptions.ProjectNotFoundException;
import com.hhrustic.ppmapp.repositories.ProjectRepository;
import com.hhrustic.ppmapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    public Project saveOrUpdateproject(Project project, String username){
        try {
            User user = userRepository.findByUsername(username);
            project.setUser(user);
            project.setProjectLeader(user.getUsername());

            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            Backlog backlog = new Backlog();
            project.setBacklog(backlog);
            backlog.setProject(project);
            backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        }catch (Exception e){
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' exists");
        }
    }

    public Project findProjectByIdentifier(String projectId, String username){
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if(project == null){
            throw new ProjectIdException("Project ID '"+ projectId + "' does not exist!");
        }

        if(!project.getProjectLeader().equals(username)){
            throw new ProjectNotFoundException("Project not found in your account");
        }

        return project;
    }

    public Iterable<Project> findAllProjects(String username){
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProjectByIdentifier(String projectId, String username){
        projectRepository.delete(findProjectByIdentifier(projectId, username));
    }

    public void updateProjectByIdentifier(String projectId, Project project, String username){
        Project projectToUpdate = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if(projectToUpdate == null){
            throw new ProjectIdException("Cannot update project with ID '" + projectId + "'");
        }

        System.out.println(projectToUpdate.toString());
        if(!projectToUpdate.getUser().getUsername().equals(username)){
            throw new ProjectNotFoundException("Project not found in your account");
        }

        if(project.getProjectName() != null){ projectToUpdate.setProjectName(project.getProjectName()); }
        if(project.getDescription() != null){ projectToUpdate.setDescription(project.getDescription()); }
        if(project.getStart_date() != null){ projectToUpdate.setStart_date(project.getStart_date()); }
        if(project.getEnd_date() != null){ projectToUpdate.setEnd_date(project.getEnd_date()); }

        projectRepository.save(projectToUpdate);
    }
}
