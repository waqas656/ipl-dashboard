package com.waqas.ipldashboard.controllers;

import com.waqas.ipldashboard.models.Match;
import com.waqas.ipldashboard.models.Team;
import com.waqas.ipldashboard.repositories.MatchRepository;
import com.waqas.ipldashboard.repositories.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin //it allows requests from other domains (e.g localhost:3000 to localhost:8080)
public class TeamController {

    private final TeamRepository teamRepository;
    private final MatchRepository matchRepository;

    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @GetMapping("/teams/{teamName}")
    public Team getTeamName(@PathVariable String teamName){ //path variable expects it to be a query parameter
        Team team = teamRepository.findByTeamName(teamName);

        //PageRequest.of(pageNumber, sizeOfElementsToReturn) so basically, from 1st page return 4 records
        team.setMatchList(matchRepository.findLatestMatchesOfTeam(teamName, 4));
        return team;
    }

}
