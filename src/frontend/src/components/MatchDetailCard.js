import {React} from 'react';

export const MatchDetailCard = ({match}) => { //getting an entry from matchList Array i-e a match
  return (
    <div className="MatchDetailCard">
      <h3>Latest Matches</h3>
      <h3>Match Details</h3>
      <h4>{match.team1} vs {match.team2}</h4>
    </div>
  );
}
