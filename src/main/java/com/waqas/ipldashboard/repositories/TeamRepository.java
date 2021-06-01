package com.waqas.ipldashboard.repositories;

import com.waqas.ipldashboard.models.Team;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Long> {
    Team findByTeamName(String teamName);
}
