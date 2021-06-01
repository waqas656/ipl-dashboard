package com.waqas.ipldashboard.repositories;

import com.waqas.ipldashboard.models.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {
    List<Match> getAllByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable);

    //java now supports method implementations inside interface using default keyword
    default List<Match> findLatestMatchesOfTeam(String teamName, int matchesListSize){
        return getAllByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0, matchesListSize));
    } //and we are using this default method so our controller looks more clean
}
