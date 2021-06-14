import { React, useEffect, useState } from 'react';
import { TeamTile } from '../components/TeamTile';
import './HomePage.scss'


export const HomePage = () => {

    const [teams, setTeams] = useState([]);

    useEffect(
        () => {
            const fetchTeams = async () => {
                const response = await fetch(`http://localhost:8080/teams`); // we using ` ` quote instead of "" or ''
                const data = await response.json();
                setTeams(data);
                console.log(data);
            }
            fetchTeams(); //using a function within a function bcos async is not allowed at root level function inside useEffect
        }, []
    );

    return (
        <div className="HomePage">

            <div className="header-section">
                <h1 className="app-name">IPL Dashboard</h1>
            </div>

            <div className="team-grid">
                {teams.map(team => <TeamTile key={team.id} teamName={team.teamName}/>)} {/*key helps react app in identifying components that are rendered in loop so it can differentiate between them*/}
            </div>

        </div>
    );
}
