import { React, useEffect, useState } from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {

    // 'team' is a state here and setTeam is a method that populates that state
    const [team, setTeam] = useState({matchList : []}); // {} inside () are used so that undefined errors dont occur wherever we are using 'team'. So this basically initilizes it as an empty object, we can initialize it with anything, lets suppose we have a counter so we can initialize it with 0.

    useEffect( //Effects are like constructors where you want something to happen upon component initialization
        //useEffects expects a function
        //useEffect is triggered whenever something changes so it leads to infinite loop of calling the callback func if we dont set empty array as second argument

        () => {
            const fetchMatches = async () => {
                const response = await fetch("http://localhost:8080/teams/Rajasthan Royals");
                const data = await response.json();
                setTeam(data);
                console.log(data);
            }
            fetchMatches(); //using a function within a function bcos async is not allowed at root level function inside useEffect
        },
        [] //this tells the effect to happen whenever something changes in this array, so in this case it is empty so the effect (callback function written above) will happen only once upon first render
    );

    return (
        <div className="TeamPage">
            <h1>{team.teamName}</h1>
            <MatchDetailCard match = {team.matchList[0]}/> {/* sending the first entry from matchList array */}
            {team.matchList.slice(1).map(match => <MatchSmallCard match = {match} />)} {/*mapping every matchList array entry to MatchSmallCard and passing the entries as "match" into the MatchSmallCard component */}
        </div> 
    );
}
