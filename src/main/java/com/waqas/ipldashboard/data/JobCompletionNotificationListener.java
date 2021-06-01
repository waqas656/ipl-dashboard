package com.waqas.ipldashboard.data;


import com.waqas.ipldashboard.models.Team;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

    private final EntityManager em;

    @Autowired
    public JobCompletionNotificationListener(EntityManager em) {
        this.em = em;
    }

    @Override
    @Transactional
    public void afterJob(JobExecution jobExecution) {
        if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");

            Map<String, Team> teamData = new HashMap<>();

            //getting all the teams names and total matches played by each team from team1 table
            em.createQuery("select m.team1, count(m) from Match m group by m.team1", Object[].class)
                    .getResultList() //getting list as object array i-e Object[] bcos we have string(team name) and a long (total occurences = total matches played)
                    .stream()
                    .map(e -> new Team((String) e[0], (long) e[1])) //mapping team name and their total matches that we get from above query to construct a Team object
                    .forEach(team -> teamData.put(team.getTeamName(), team)); //and for each Team object that we construct in last statement we put into hashmap which helps us to look up "Team" instance using its key that is the team name and its value that is the Team object


            //getting all the teams names and total matches played by each team from team2 table
            em.createQuery("select m.team2, count(m) from Match m group by m.team2", Object[].class)
                    .getResultList() //getting list as object array i-e Object[] bcos we have string(team name) and a long (total occurences = total matches played)
                    .stream()
                    .forEach( //getting each entry from above query result list
                            e -> {
                                Team team = teamData.get((String) e[0]); // finding each team using its name from above query e[1] that is team's name
                                team.setTotalMatches(team.getTotalMatches() + (long)e[1]); //incrementing that team's total matches played by the amount of total matches that team played as team 2
                            } //only downside to above approach is if sometime never played a match as team 1 they won't be in our hashmap which can be countered by using .containsKey() method
                    );

            //finding total number of wins by each team which we can do by looking at that specific column (matchWinner) and check how many times that name occurred which reflects total number of wins
            em.createQuery("select m.matchWinner, count(m) from Match m group by m.matchWinner", Object[].class)//getting occurrence(count) of each team
            .getResultList()
            .stream()
            .forEach(
                    e ->
                    {
                        Team team = teamData.get((String) e[0]);
                        if (team != null) team.setTotalWins((long) e[1]);
                    }
            );

            teamData.values().forEach(team -> em.persist(team));
            teamData.values().forEach(team -> System.out.println(team));

//            jdbcTemplate.query("SELECT team1, team2, date, match_winner FROM match",
//                    (rs, row) ->
//                            "[Team 1]: " +
//                            rs.getString(1) +
//                                    " " +
//
//                            ", [Team 2]: " +
//                            rs.getString(2) +
//
//                                    " " +
//
//                            ", [Date]: " +
//                            rs.getString(3) +
//
//                            " " +
//
//                            ", [Winner]: " +
//                            rs.getString(4))
//                    .forEach(str -> System.out.println(str));
        }
    }
}
