package com.waqas.ipldashboard.data;

import com.waqas.ipldashboard.models.Match;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemProcessor;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class MatchDataProcessorSpringBatch implements ItemProcessor<MatchInput, Match> {

    //This class take MatchInput as input and returns Match as output
    private static final Logger log = LoggerFactory.getLogger(MatchDataProcessorSpringBatch.class);

    @Override
    public Match process(final MatchInput matchInput) throws Exception {

        final Match match = new Match();

        log.info("Converting (" + matchInput + ") into (" + match + ")");

        match.setId(Long.parseLong(matchInput.getId()));
        match.setCity(matchInput.getCity());
        match.setPlayerOfMatch(matchInput.getPlayerOfMatch());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        match.setDate(LocalDate.parse(matchInput.getDate(), formatter));

        match.setVenue(matchInput.getVenue());
        match.setTossWinner(matchInput.getTossWinner());
        match.setTossDecision(matchInput.getTossDecision());

        String firstInningsTeam, secondInningsTeam;
        if ("bat".equalsIgnoreCase(matchInput.getTossDecision())) {
            firstInningsTeam = matchInput.getTossWinner();
            secondInningsTeam = matchInput.getTeam1().equals(firstInningsTeam) ?
                    matchInput.getTeam2() : matchInput.getTeam1();
        }
        else {
            secondInningsTeam = matchInput.getTossWinner();
            firstInningsTeam = matchInput.getTeam1().equals(secondInningsTeam) ?
                    matchInput.getTeam2() : matchInput.getTeam1();
        }

        match.setTeam1(firstInningsTeam);
        match.setTeam2(secondInningsTeam);

        match.setMatchWinner(matchInput.getWinner());
        match.setResult(matchInput.getResult());
        match.setResultMargin(matchInput.getResultMargin());
        match.setUmpire1(matchInput.getUmpire1());
        match.setUmpire2(matchInput.getUmpire2());


        return match;
    }

}
