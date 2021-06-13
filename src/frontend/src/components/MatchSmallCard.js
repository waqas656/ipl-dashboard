import { React } from 'react';
import { Link } from 'react-router-dom';
import './MatchSmallCard.scss';


export const MatchSmallCard = ({ teamName, match }) => {

  if (!match) return null; //if match is empty return without doing anything else render the component


  //we need to check what is the name of the other team so that we can write only "vs {Other team} instead of writing {team1} vs {team2}"
  const otherTeamName = teamName === match.team1 ? match.team2 : match.team1;

  const otherTeamRoute = `/teams/${otherTeamName}`; //we move towards the other team using its name. When we click on it the "teamName" changes which triggers useEffect of TeamPage.js and it calls the url that is defined in its callback function

  const isMatchWon = teamName === match.matchWinner; //to change color of winning team

  return (
    <div className={isMatchWon ? 'MatchSmallCard won-card' : 'MatchSmallCard lost-card'}>

      <span className="vs">vs</span>
        <h1>
          <Link to={otherTeamRoute}>{otherTeamName}</Link> {/* we want these other teams to be a link and clickable so we are using Router Links */}
        </h1>
      <p>{match.matchWinner} won by {match.resultMargin} {match.result}</p>

    </div>
  );
}
