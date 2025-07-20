// src/pages/TeamWinPercentagePage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { simulationsApi } from '../api/simulations';
import type { Team } from '../types';
import PageHeader from '../components/PageHeader';
import FilterableTable, { type Column } from '../components/FilterableTable';
import { getWinPercentageColor } from '../utils/colors';

interface WinPercentageRowData {
    away_team: string;
    venue_name: string;
    date: string;
    home_win_percentage: number;
}

interface TeamWinPercentageParams extends Record<string, string | undefined> {
  teamId: string;
}

const TeamWinPercentagePage: React.FC = () => {
    const { teamId: teamIdParam } = useParams<TeamWinPercentageParams>();
    const navigate = useNavigate();
    const location = useLocation();

    const team = location.state?.team as Team | undefined;

    const [data, setData] = useState<WinPercentageRowData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!teamIdParam) {
            setError("No Team ID provided in the URL.");
            setLoading(false);
            return;
        }

        const id = parseInt(teamIdParam, 10);
        if (isNaN(id)) {
            setError(`Invalid Team ID: "${teamIdParam}".`);
            setLoading(false);
            return;
        }

        if (!team || team.team_id !== id) {
            setError("Team data not found or mismatched. Please navigate from the simulation list.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        simulationsApi.getHomeWinPercentageForTable(id).then((apiData: WinPercentageRowData[]) => {
            const formattedData = apiData.map(item => ({
                away_team: item.away_team,
                venue_name: item.venue_name,
                date: new Date(item.date).toLocaleDateString(),
                home_win_percentage: item.home_win_percentage,
            }));
            setData(formattedData);
            setLoading(false);
        }).catch(caughtError => {
            console.error("Failed to fetch win percentage data:", caughtError);
            setError("Failed to load win percentage data. Please try again.");
            setLoading(false);
        });
    }, [teamIdParam, team]);


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
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    if (!team) return <div className="text-center p-10 text-red-500">Team data is missing. Cannot display win percentage.</div>;

    return (
        <div className="p-6">
            <PageHeader title={`Home Win % for ${team.team}`} onBack={() => navigate(-1)} />
            <FilterableTable
                columns={columns}
                data={data}
                filterableCols={filterableCols}
            />
        </div>
    );
};

export default TeamWinPercentagePage;