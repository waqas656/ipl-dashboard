import { React, useEffect, useState } from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { useParams, Link } from 'react-router-dom';
import './TeamPage.scss';
import { PieChartComponent } from '../components/PieChartComponent';

export const TeamPage = () => {

    // 'team' is a state here and setTeam is a method that populates that state
    const [team, setTeam] = useState({ matchList: [] }); // {} inside () are used so that undefined errors dont occur wherever we are using 'team'. So this basically initilizes it as an empty object, we can initialize it with anything, lets suppose we have a counter so we can initialize it with 0.

    const { teamName } = useParams(); // we are accepting teamName as query param here and this way (const { teamName }) of assigning variables is called object destructuring

    useEffect( //Effects are like constructors where you want something to happen upon component initialization
        //useEffects expects a function
        //useEffect is triggered whenever something changes so it leads to infinite loop of calling the callback func if we dont set empty array as second argument

        () => {
            const fetchTeam = async () => {
                const response = await fetch(`http://localhost:8080/teams/${teamName}`); // we using ` ` quote instead of "" or ''
                const data = await response.json();
                setTeam(data);
                console.log(data);
            }
            fetchTeam(); //using a function within a function bcos async is not allowed at root level function inside useEffect
        },
        [teamName] //this tells the effect to happen whenever something (in this case: teamName) changes in this array, so if it is empty then the effect (callback function written above) will happen only once upon first render
    );

    if (!team || !team.teamName) {
        return <h1>Team Not Found</h1>
    }

    return (
        <div className="TeamPage">
            <div className="team-name-section">
                <h1 className="team-name">{team.teamName}</h1>
            </div>
            <div className="win-loss-section">
                Wins / Losses
                <PieChartComponent wins={team.totalWins} losses={team.totalMatches - team.totalWins}></PieChartComponent>
            </div>
            <div className="match-detail-section">
                <h3>Latest Matches</h3>

                <MatchDetailCard teamName={team.teamName} match={team.matchList[0]} /> {/* sending the first entry from matchList array */}
            </div>

            {team.matchList.slice(1).map(match => <MatchSmallCard key={match.id} teamName={team.teamName} match={match} />)} {/*mapping every matchList array entry to MatchSmallCard and passing the entries as "match" into the MatchSmallCard component */}

            {/*In both of above components we are passing 2 arguments one is teamName which tells what is the name of the team about whom is that page. */}

            <div className="more-link"> 
            <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More {'>'}</Link> {/* {''} brackets and commas are used to put > symbol at the end of more */}
            </div>

        </div>
    );
}
