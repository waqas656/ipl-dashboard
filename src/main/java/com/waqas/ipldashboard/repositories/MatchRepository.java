package com.waqas.ipldashboard.repositories;

import com.waqas.ipldashboard.models.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {
    //the func is used to get latest matches
    List<Match> getAllByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable);

    //java now supports method implementations inside interface using default keyword
    default List<Match> findLatestMatchesOfTeam(String teamName, int matchesListSize){
        return getAllByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0, matchesListSize));        //PageRequest.of(pageNumber, sizeOfElementsToReturn) so basically, from 1st page return 4 records
    } //and we are using this default method so our controller looks more clean

    //find All the Matches by Team
    @Query(value = "select * from Match  where (team1 = :teamName or team2 = :teamName) and (date >= :startDate and date < :endDate) order by date desc", nativeQuery = true) //NOTE: these brackets () are very important to distinguish both conditions
    List<Match> findMatchesByTeamNameAndYear(String teamName, LocalDate startDate, LocalDate endDate);
    //we could write above query using only method name with : getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(teamNam1, startDate, endDate, teamName2, startDate, endDate) but this was much complex than the query way. And we could also write above query without native sql way and using: select m from Match m, and removing nativeQuery=true
}
