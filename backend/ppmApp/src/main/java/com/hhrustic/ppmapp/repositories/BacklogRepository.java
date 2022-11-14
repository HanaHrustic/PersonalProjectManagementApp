package com.hhrustic.ppmapp.repositories;

import com.hhrustic.ppmapp.domain.Backlog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long> {
     Backlog findByProjectIdentifier(String projectIdentifier);
}
