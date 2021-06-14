import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MatchDetailCard } from '../components/MatchDetailCard';
import './MatchPage.scss';
import { YearSelector } from '../components/YearSelector';


export const MatchPage = () => {

    const [matches, setMatches] = useState([]);

    const { teamName, year } = useParams(); // we are accepting teamName as query param here and this way (const { teamName }) of assigning variables is called object destructuring

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`http://localhost:8080/teams/${teamName}/matches?year=${year}`); // we using ` ` quote instead of "" or ''
                const data = await response.json();
                setMatches(data);
                console.log(data);
            }
            fetchMatches(); //using a function within a function bcos async is not allowed at root level function inside useEffect
        },
        [teamName, year] //this tells the effect to happen whenever something (in this case: teamName or year) changes in this array, so if it is empty then the effect (callback function written above) will happen only once when component loads
    );

    return (
        /* 
        TODO
          -Add drop down selector for filtering matches
        */
        <div className="MatchPage">

            <div className="year-selector">
                <h3>Select Year</h3>
                <YearSelector teamName = {teamName}/>
            </div>

            <div>
                <h1 className="page-heading">{teamName} matches in {year}</h1>
                {matches.map(match => <MatchDetailCard key={match.id} teamName={teamName} match={match} />)}
            </div>

        </div>
    );
}
