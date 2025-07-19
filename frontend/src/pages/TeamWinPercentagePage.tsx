// src/pages/TeamWinPercentagePage.tsx

import React, { useState, useEffect } from 'react';
import { simulationsApi } from '../api/simulations';
import type { Team } from '../types';
import PageHeader from '../components/PageHeader';
import FilterableTable, { type Column } from '../components/FilterableTable';

interface WinPercentageRowData {
    away_team: string;
    venue_name: string;
    date: string;
    home_win_percentage: number; 
}

interface TeamWinPercentagePageProps {
    team: Team;
    onBack: () => void;
}

const TeamWinPercentagePage: React.FC<TeamWinPercentagePageProps> = ({ team, onBack }) => {
    const [data, setData] = useState<WinPercentageRowData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        simulationsApi.getHomeWinPercentageForTable(team.team_id).then((apiData: WinPercentageRowData[]) => {
            const formattedData = apiData.map(item => ({
                away_team: item.away_team,
                venue_name: item.venue_name,
                date: new Date(item.date).toLocaleDateString(),
                home_win_percentage: item.home_win_percentage, // Keep the original number
            }));
            setData(formattedData);
            setLoading(false);
        }).catch(error => {
            console.error("Failed to fetch win percentage data:", error);
            setLoading(false);
        });
    }, [team.team_id]);
    
    // Helper function to get the correct Tailwind CSS class based on the win rate
    const getWinPercentageColor = (percentage: number): string => {
        if (percentage < 40) {
            return 'text-red-600 font-semibold';
        }
        else if (percentage > 55) {
            return 'text-green-600 font-semibold';
        }
        return 'text-black';
    };

    const columns: Column<WinPercentageRowData>[] = [
        { key: 'away_team', label: 'Away Team' },
        { key: 'venue_name', label: 'Venue' },
        { key: 'date', label: 'Date' },
        {
            key: 'home_win_percentage',
            label: 'Home Win %',
            render: (item) => (
                <span className={getWinPercentageColor(item.home_win_percentage)}>
                    {item.home_win_percentage} %
                </span>
            )
        }
    ];

    const filterableCols: Column<WinPercentageRowData>[] = [
        { key: 'away_team', label: 'Away Team' },
        { key: 'venue_name', label: 'Venue' },
        { key: 'date', label: 'Date' }
    ];

    if (loading) {
        return <div className="text-center p-10">Loading win percentage...</div>;
    }

    return (
        <div className="p-6">
            <PageHeader title={`Home Win % for ${team.team}`} onBack={onBack} />
            <FilterableTable
                columns={columns}
                data={data}
                filterableCols={filterableCols}
            />
        </div>
    );
};

export default TeamWinPercentagePage;