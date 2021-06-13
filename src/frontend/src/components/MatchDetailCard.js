import { React } from 'react';
import { Link } from 'react-router-dom';
import './MatchDetailCard.scss';

export const MatchDetailCard = ({ teamName, match }) => { //getting an entry from matchList Array i-e a match. This is object destructuring {match}

  if (!match) return null; //if match is empty return without doing anything else render the component

  //we need to check what is the name of the other team so that we can write only "vs {Other team} instead of writing {team1} vs {team2}"
  const otherTeamName = teamName === match.team1 ? match.team2 : match.team1;

  const otherTeamRoute = `/teams/${otherTeamName}`; //we move towards the other team using its name. When we click on it the "teamName" changes which triggers useEffect of TeamPage.js and it calls the url that is defined in its callback function

  const isMatchWon = teamName === match.matchWinner; //to change color of winning team

  return (
    <div className={isMatchWon ? 'MatchDetailCard won-card' : 'MatchDetailCard lost-card'}>

      <div>
        <span className="vs">vs</span>
        <h1>
          <Link to={otherTeamRoute}>{otherTeamName}</Link> {/* we want these other teams to be a link and clickable so we are using Router Links */}
        </h1>
        <h2 className="match-date">{match.date}</h2>
        <h3 className="match-venue">at {match.venue}</h3>
        <h3 className="match-result">{match.matchWinner} won by {match.resultMargin} {match.result}</h3>
      </div>

      <div className="additional-detail">
        <h3>First Innings</h3>
        <p>{match.team1}</p>
        
        <h3>Second Innings</h3>
        <p>{match.team2}</p>
        
        <h3>Man of the Match</h3>
        <p>{match.playerOfMatch}</p>
        
        <h3>Umpires</h3>
        <p>{match.umpire1}, {match.umpire2}</p>

      </div>

    </div>

  );
}
