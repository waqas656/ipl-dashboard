import { PieChart } from 'react-minimal-pie-chart';
import { React } from 'react';

export const PieChartComponent = ( {wins, losses}  ) => {
    return (
        <PieChart
            data={[
                { title: 'Wins', value: wins, color: '#4da375' },
                { title: 'Losses', value: losses, color: '#a34d5d' },
            ]}
        />

    );
}