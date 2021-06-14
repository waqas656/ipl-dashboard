import { React } from 'react';
import { Link } from 'react-router-dom';
import './YearSelector.scss'


export const YearSelector = ({ teamName }) => {
    let years = [];
    const startYear = process.env.REACT_APP_DATA_START_YEAR;
    const endYear = process.env.REACT_APP_DATA_END_YEAR; // .env files need to be in the same directory from where we write 'npm start' to work with process.env.{name}

    for (let i = endYear; i >= startYear; i--) { //saving the most recent year first
        years.push(i);
    }

    return (
        <ol className="YearSelector">
            {
                years.map(year =>
                    <li key={year}> {/* key is defined so for each list ite react should have unique key to identify each component (which in this case is a list item with a link) */}
                        <Link to={`/teams/${teamName}/matches/${year}`}>{year}</Link>
                    </li>
                )
            }
        </ol>
    );

}